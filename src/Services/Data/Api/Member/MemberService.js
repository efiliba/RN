import React from "react";
import { browserHistory } from 'react-router';
import { MemberApi } from "./MemberApi";
import { LocalStorageUtil } from "Services/Utility/LocalStorageUtil";
import { push } from "react-router-redux";
import { RouteUrls } from "Services/Constants/RouteUrls";
import { isNullOrUndefined } from "Services/Utility/Util";
import GoogleAnalyticsHelper from "../../../Utility/GoogleAnalyticsHelper";
import {Logger} from "../../../Utility/Logger";

export class MemberService {
    constructor() {
        this.memberApi = new MemberApi();
    }

    _processLoginResponse(response, callback) {
        if (response.data) {
            const token = { tokenCode: response.data.AccessToken, expires: response.data.TokenExpires };
            GoogleAnalyticsHelper.trackLogin(response.data.MembershipState);

            LocalStorageUtil.setToken(token);
            LocalStorageUtil.setUserId(response.data.UserId);
            this.memberApi.saveToken(token);
            this._setLoggerContext(response.data);
            if (callback) {
                callback(response);
            }

        } else {
            LocalStorageUtil.removeToken();
            this._removeLoggerContext();
        }
    }

    _setLoggerContext(data) {
        Logger.setContext(data);
    }

    _removeLoggerContext() {
        Logger.removeContext();
    }

    login(values, callback,redirectIfFailed=false) {
        this.memberApi.login(values, (response) => {
            if (response.errors && response.errors.length > 0 && redirectIfFailed)
                browserHistory.push("/member/login");  
            this._processLoginResponse(response, callback);
        });
    }

    socialLogin(values, callback) {
        this.memberApi.socialLogin(values, (response) => {
            this._processLoginResponse(response, callback);
        });
    }

    loginCallback(data, url) {
        if (isNullOrUndefined(url))
            url = RouteUrls.dashboard;
        if (!data.data.AcceptedLatestTerms) {
            url = RouteUrls.termsChanged;
            this.memberApi.postAcceptTerms();
        } else
            if (url === RouteUrls.dashboard && data.data.ShowWelcomeBackTour) {
                url = url + "?welcomeBack=1";
            }
        //add attribute to localStorage
        this.memberApi.getAdAttribute((response) => {
            if (!isNullOrUndefined(response) && response.length > 0)
                LocalStorageUtil.setAdAttribute(response);
        });
        this.memberApi.clearObj("shortlistedProducts");
        this.memberApi.clearObj("answerList");
        browserHistory.push(url);       
    }

    loginWithToken(token) {
        this.memberApi.saveToken(token);
        this.memberApi.getLoginInfo((response) => {
            this._setLoggerContext(response.data);
        });
    }

    logout() {
        LocalStorageUtil.removeToken();
        this.memberApi.logout();
        this._removeLoggerContext();
    }

   

}