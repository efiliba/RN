import { BaseActions } from "../Base/BaseActions";
import { StateProperty } from "Services/Data/Models/StateProperty";

export class SystemActions extends BaseActions {
    constructor() {
        super();
    }

    getSystemNotification(placement, stateProperty) {
        const url = `/api/system/notification/${placement}/current`;
        return super.getSuccessActionDefition(url, stateProperty);
    }

    getUrlInformation(targetUrl) {
        const url = `/api/system/GetUrlInformation?url=${targetUrl}`;
        return super.getSuccessActionDefition(url);
    }
};