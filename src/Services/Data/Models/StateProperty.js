import {Util} from "../../Utility/Util";

export class StateProperty {
    constructor(data = null, isLoading = null, errors = []) {
        this.data = data;
        this.isLoading = isLoading;
        this.errors = errors;
    }

    static propertiesRequestedFromServer = [];

    static isWaitingOnServer(value) {
        return value && value.isLoading;
    }

    static isLoaded(value) {
        return value && !Util.isNullOrUndefined(value.data);
    }

    static needFromServer(value, addToRequestedProperties=true) {
        if (!value) {
            return true;
        }

        if (addToRequestedProperties === false) return false; //if second parametter is false we don't have to call api

        const needFromServer = value.isLoading === null && value.errors.length === 0 && !value.data;

        //we rely on the object memory reference, to see if have already stated that this state property has been already requested data from the server
        //because there're times when there's a time gap between the loading state of property being updated in redux state
        if (needFromServer && StateProperty.propertiesRequestedFromServer.find(x => x === value)) {
            return false;
        }

        StateProperty.propertiesRequestedFromServer.push(value);
       
        return needFromServer;
    }

    static hasError(value) {
        return value.errors && value.errors.length > 0;
    }

    static getInstance(value) {
        if (value && value.errors && value.errors.length > 0) {
            return new StateProperty(null, false, value.errors);
        }

        return new StateProperty(value, false);
    }
}