import { Util } from "../../Utility/Util";

export class ActionDefinition {

    constructor(url, action, subKey) {
        this.url = url;
        this.actionType = action;
        this.onError = null;
        this.onRequest = null;
        this.onSuccess = null;

        if (subKey) {
            this.actionType = `${this.actionType}_${subKey}`;
        }
    }

    getRequestActionType() {
        return this.actionType + "_REQUEST";
    }

    getCompleteActionType() {
        return this.actionType + "_COMPLETE";
    }

    getSuccessActionType() {
        return this.actionType + "_SUCCESS";
    }

    getErrorActionType() {
        return this.actionType + "_ERROR";
    }

    reducer(action, state) {
        switch(action.type) {
            case this.getSuccessActionType():
                return this._callReducer(state, action, this.onSuccess);

            case this.getCompleteActionType():
                return this._callReducer(state, action, this.onComplete);

            case this.getErrorActionType():
                return this._callReducer(state, action, this.onError);

            case this.getRequestActionType():
                return this._callReducer(state, action, this.onRequest);
        }

        return state;
    }

    _callReducer(state, action, reducer) {
        if (!Util.isNullOrUndefined(reducer)) {
            return reducer(state, action);
        }

        return state;
    }
}