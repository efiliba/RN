import { BaseApi } from "../Base/BaseApi";
import { SystemActions } from "./SystemActions";

export class SystemApi extends BaseApi {

    constructor() {
        super();
        this.systemActions = new SystemActions();
    }

    getLoginNotification() {
        super.sendGetRequest(this.systemActions.getSystemNotification("LoginPage", "loginNotification"));
    }

    getIdNotification() {
        super.sendGetRequest(this.systemActions.getSystemNotification("IdVerification", "idNotification"));
    }

    getUrlInformation(url, callback) {
        super.sendGetRequest(this.systemActions.getUrlInformation(url), callback);
    }
}