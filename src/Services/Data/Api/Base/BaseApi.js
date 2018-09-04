import AppData from "Services/Utility/AppData";
import { Util } from "Services/Utility/Util";
import { FetchApi } from "./FetchApi";
import { push } from "react-router-redux";
import { RouteUrls } from "../../../Constants/RouteUrls";
import { MemberService } from "../Member/MemberService";
import { Logger } from "../../../Utility/Logger";

export class BaseApi extends FetchApi {

    get dispatch() {
        return AppData.ReduxDispatch;
    }

    sendLocalRequest(actionDefinition, payload = null) {
        this.dispatch({ type: actionDefinition.getSuccessActionType(), actionDefinition: actionDefinition, payload: payload });
    }

    sendGetRequest(actionDefinition, successHandler, errorHandler) {
        this._broadcastRequest(actionDefinition);
        const promise = super.sendGetRequest(actionDefinition.url);
        this._processPromise(promise, actionDefinition, successHandler, errorHandler);
    }

    sendDeleteRequest(actionDefinition, successHandler, errorHandler) {
        this._broadcastRequest(actionDefinition);
        const promise = super.sendDeleteRequest(actionDefinition.url);
        this._processPromise(promise, actionDefinition, successHandler, errorHandler);
    }

    sendPostRequest(actionDefinition, data, successHandler, errorHandler) {
        this._broadcastRequest(actionDefinition);
        const promise = super.sendPostRequest(actionDefinition.url, data);
        this._processPromise(promise, actionDefinition, successHandler, errorHandler);
    }

    sendPutRequest(actionDefinition, data, successHandler, errorHandler) {
        this._broadcastRequest(actionDefinition);
        const promise = super.sendPutRequest(actionDefinition.url, data);
        this._processPromise(promise, actionDefinition, successHandler, errorHandler);
    }

    _broadcastRequest(actionDefinition) {
        this.dispatch({ type: actionDefinition.getRequestActionType(), actionDefinition: actionDefinition, payload: null });
    }

    _handleUnauthorizedRequest() {
        const service = new MemberService();
        //service.logout();
        this.dispatch(push(RouteUrls.getLoginUrl()));
    }

    _handlePageNotFoundRequest() {
        this.dispatch(push(RouteUrls.pageNotFound));
    }

    _processPromise(responsePromise, actionDefinition, successHandler, errorHandler) {
        let responseText = null;
        let responseCode = null;

        responsePromise.then((response) => {

            this.dispatch({ type: actionDefinition.getCompleteActionType(), actionDefinition: actionDefinition, payload: null });
            responseCode = response.status;

            if (response.status === 401) {
                this._handleUnauthorizedRequest();
            }
            else if (response.status === 404) {
                this._handlePageNotFoundRequest();
            }

            return response.text();
        })
            .then((text) => {
                responseText = text;
                return text ? JSON.parse(text) : null;
            })
            .then((data) => {
                this.dispatch({ type: actionDefinition.getSuccessActionType(), actionDefinition: actionDefinition, payload: data });

                if (successHandler) {
                    successHandler(data);
                }
            })
            .catch((error) => {
                this.dispatch({ type: actionDefinition.getErrorActionType(), actionDefinition: actionDefinition, payload: null });

                if (errorHandler) {
                    errorHandler(error);
                }

                Logger.logError(error, {
                    url: actionDefinition.url,
                    response: responseText,
                    httpCode: responseCode
                });
            });
    }

}