import store from "store.jsx";
import { browserHistory } from 'react-router';
import FetchHelper from "./FetchHelper";
import { LoadingActions } from "Services/Data/Api/Loading/LoadingActions";
import { loginUserSuccess, loginUserRequest, loginUserFailure } from "Actions/AuthActions.jsx";
import { push } from 'react-router-redux';

/**
 * Performs all login logic including dispatching the show/hide loading
 * actions and the correct request/success/failure actions
 * @param {any} requestUri
 * @param {any} requestBody
 * @param {any} redirectTo
 */
const CallLoginApi = function (requestUri, requestBody, redirectTo, handlerFn, statusText = "Logging you in now...") {

    store.dispatch(LoadingActions.show(statusText));
    store.dispatch(loginUserRequest(null));

    fetch(requestUri,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "__RequestVerificationToken": $("input:hidden[name=\"__RequestVerificationToken\"]").val()
        },
        credentials: 'include', // Include cookies 
        body: JSON.stringify(requestBody)
        }).then(handlerFn).then(function (response) {
            console.log(response);

            if (response !== null && response !== undefined) {
                // If there are errors, log immediately and return
                if (response.json.Errors !== null && response.json.Errors.length > 0) {
                    store.dispatch(loginUserFailure(response.json.Errors));
                    // Hide the loading screen
                    store.dispatch(LoadingActions.hide());
                }
                // If the token is set
                else if (response.json.AccessToken !== null) {
                    // Dispatch success
                    store.dispatch(loginUserSuccess(response.json));

                    // Redirect if necessary
                    if (redirectTo) {
                        store.dispatch(push(redirectTo));
                    }
                    // Hide the loading screen
                    store.dispatch(LoadingActions.hide());
                }
                else {
                    // Else error out
                    throw { statusText: "Authentication failed"};
                }
            }
        }).catch(function (error) {
            console.log(error);

            store.dispatch(LoadingActions.hide());
            store.dispatch(loginUserFailure(error));
        });
}

/**
 * Authentication lib that is exported to the other classes
 * And wraps both the Token Login and password login
 * @type {Object}
 */
var AuthHelper = {

    loginViaSocial(type, model) {
        console.log(model);
        store.dispatch(LoadingActions.show("Logging you in with your Social Media account now"));

        // Log in immediately
        FetchHelper.callApi("/api/Social/" + type, {
            method: "POST",
            body: JSON.stringify(model)
        }, function(result) {
            console.log("Social Login result", result);
            // Cancel immediately on any errors
            if (result.Errors !== null && result.Errors.length > 0) {
                throw result.Errors[0];
            }
            // Result will be a ClaimsInformationResult
            if (result.AccessToken !== null) {
                this.loginViaToken(result.AccessToken, "/member/secure");
            }
            else {
                // Login failed
                storeState(tokenResult);
            }

            store.dispatch(LoadingActions.hide());
        }.bind(this));
    },

    /**
     * Log in via a password and username combo
     * @param {any} username
     * @param {any} password
     * @param {any} redirectTo
     */
    loginViaPassword(username, password, redirectTo) {

        CallLoginApi("/api/account/login",
            {
                Email: username,
                Password: password
            },
            redirectTo,
            function (response) {
                // If we get a 401, redirect to login
                if (response.status === 401 || response.statusText === "Unauthorized") {
                    console.log("Failed login", response);
                    // Logout and redirect to Login/Timeout
                    localStorage.removeItem("token");
                    store.dispatch(push("/member/login"));
                    return null;
                }
                if (response.status >= 200 && response.status < 300) {
                    return response.json().then(function (data) {
                        // Handle the JSON response here
                        return { status: response.status, headers: response.headers, json: data }
                    });
                } else {
                    // Massive problem.
                    return response;
                }
            },
            "Logging you in with your password..");

      
    },
    /**
     * Given a token ,attempts to authenticate against it
     * @param {any} givenToken
     */
    loginViaToken(givenToken, redirectTo = null) {

        CallLoginApi("/api/account/token",
            {
                Token: givenToken
            },
            redirectTo,
            function (response) {
                // If we get a 401, redirect to login
                if (response.status === 401 || response.statusText === "Unauthorized") {
                    console.log("Failed login", response);
                    // Logout and redirect to Login/Timeout
                    localStorage.removeItem("token");
                    store.dispatch(push("/member/login"));
                    throw { statusText: "Unauthorized" };
                }
                // If we get a valid response but there are errors, also redirect to Login
                if (response.status >= 200 && response.status < 300) {
                    return response.json().then(function (data) {
                        if (data.Errors.length > 0) {
                            // Logout and redirect to Login/Timeout
                            localStorage.removeItem("token");
                            store.dispatch(push("/member/login"));
                            throw { statusText: data.Errors[0] };
                        }
                        // Handle the JSON response here
                        return { status: response.status, headers: response.headers, json: data }
                    });
                } else {
                    // Massive problem.
                    return response;
                }
            },
            "Restoring your session..");
    }

}

module.exports = AuthHelper;