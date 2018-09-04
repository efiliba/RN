import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';
import AppData from "Services/Utility/AppData";

const defaultNotificationOptions = {
    // uid: 'once-please', // you can specify your own uid if required 
    title: '',
    message: '',
    position: 'tr',
    autoDismiss: 5 // seconds
};

/**
 * Fetch lib to help with Fetch Calls and all the other related logic
 * @type {Object}
 */
var FetchHelper = {
    /**
     * Wrapper around the standard fetch functionality with some added
     * helper logic:
     * * Gets the RequestVerificationToken if it is visible
     * * Logs out users if they are no longer authenticated (timedout)
     * * Error handling logic
     * @param {any} requestUri - The URI to call
     * @param {any} requestParams - Object expected with { method, headers, body (must be JSON.stringified), credentials ... }
     * @param {any} requestBody - 
     * @param {any} successFn
     */
    callApi(requestUri, requestParams, successFn) {

        let dispatch = AppData.ReduxDispatch;

        // Default parameters for the FETCH call
        var defaultParams = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "__RequestVerificationToken": $("input:hidden[name=\"__RequestVerificationToken\"]").val()
            },
            credentials: 'include' // Include cookies 
        };

        // If we have an access token to use, attach it to the params
        if (localStorage.getItem("token") !== null) {
            // Merge the headers
            defaultParams.headers = Object.assign({}, defaultParams.headers, { "Authorization": "Bearer " + localStorage.getItem("token") });
        }

        // Using the standard fetch API
        fetch(requestUri,
            // Add default params and merge them with the given params
            Object.assign(defaultParams, requestParams))
        // Handle the Response codes returned
        .then(function(response) {
            // If we get a 401, redirect to login
            if (response.status === 401 || response.statusText === "Unauthorized") {
                console.log("Failed login", response);
                // Logout and redirect to Login/Timeout
                localStorage.removeItem("token");
                dispatch(push("/member/login"));
                return null;
            }
            if (response.status >= 200 && response.status < 300) {
                return response.json().then(function(data) {
                    // Handle the JSON response here
                    return {
                        status: response.status,
                        headers: response.headers,
                        json: data
                    }
                });
            } else {
                // Massive problem.
                return response;
            }
            // handle the actual result
        }).then(function(response) {
            console.log(response);

            if (response !== null && response !== undefined) {
                // If there are errors, log immediately and return
                if (response.json.Errors !== null && response.json.Errors !== undefined && response.json.Errors.length > 0) {
                    dispatch(Notifications.error(Object.assign({},
                        defaultNotificationOptions,
                        {
                            title: "Error",
                            message: response.json.Errors[0]
                        })));
                }
                // Call the success callback with the data
                else if (successFn) {
                    successFn(response.json);
                }
            }
        }).catch(function(error) {
                console.log(error);

                dispatch(Notifications.error(Object.assign({},
                    defaultNotificationOptions,
                    {
                        title: "Error",
                        message: error.message
                    })));
            }
        );
    }
}

module.exports = FetchHelper;