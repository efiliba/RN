import { Util } from "Services/Utility/Util";

export class LocalStorageUtil {

    static get _tokenKey() {
        return "token";   
    }

    static get _neverExpires() {
        return 999;
    }

    static _setCookie(name, value, days) {
        let expires = null;

        if (days) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));//convert days to milliseconds
            expires = `expires=${d.toUTCString()}`;
        }
        
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    static _expireCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    static _getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    static setToken(token) {
        this._setCookie(this._tokenKey, JSON.stringify(token));
        this._setCookie("ssr", "N", this._neverExpires);
    }

    static setUserId(id) {
        this._setCookie("uid", id, this._neverExpires);
    }

    static getToken() {
        const token = this._getCookie(this._tokenKey);

        if (token) {
            return JSON.parse(token);
        }

        return null;
    }

    static removeToken() {
        this._expireCookie(this._tokenKey);
    }

    static setReferrer(utmCampaign, referralCode) {
        const cookieName = "referrer";
        const currentRawValue = this._getCookie(cookieName);

        if (currentRawValue) {
            const value = JSON.parse(currentRawValue);

            if (!utmCampaign) {
                utmCampaign = value.utmCampaign;
            }

            if (!referralCode) {
                referralCode = value.referralCode;
            }
        }

        this._setCookie(cookieName, JSON.stringify({ utmCampaign, referralCode }), this._neverExpires);
    }

    static setAdAttribute(data) { 
        if (Util.isLocalStorageDefined())
            localStorage.setItem("adAttribute", JSON.stringify(data));
    }

    static getAdAttribute() {
        if (Util.isLocalStorageDefined())
            return JSON.parse(localStorage.getItem("adAttribute"));
        else return null;
    }

}