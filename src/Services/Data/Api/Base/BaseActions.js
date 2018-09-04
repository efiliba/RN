import { ActionDefinition } from "../../Models/ActionDefinition";
import { StateProperty } from "../../Models/StateProperty";
import { StatePropertyDictionary } from "../../Models/StatePropertyDictionary";

export class BaseActions {
    constructor() {

    }

    _getNewActionDefinition(url, key, subKey) {
        const actionDefinition = new ActionDefinition(url, key, subKey);
        return actionDefinition;
    }

    updateState(state, change) {
        return Object.assign({}, state, change);
    }

    stateHasProperty(state, propertyName) {
        if (!state || !propertyName || !state.hasOwnProperty(propertyName))
            return false;

        return true;
    }

    _getPropertyChange(state, statePropertyName, propertyKey, stateProperty) {
        const change = {};

        if (!propertyKey) {
            change[statePropertyName] = stateProperty;
        } else {
            const subProperty = { ...state[statePropertyName] };
            subProperty[propertyKey] = stateProperty;
            change[statePropertyName] = subProperty;
        }

        return change;
    }

    _getOnRequestHandler(statePropertyName, propertyKey) {
        const handler = (state) => {
            if (!this.stateHasProperty(state, statePropertyName))
                return state;

            const stateProperty = new StateProperty(null, true);
            const change = this._getPropertyChange(state, statePropertyName, propertyKey, stateProperty);
            return this.updateState(state, change);
        };

        return handler;
    }

    _getOnSuccessHandler(statePropertyName, propertyKey) {
        const handler = (state, action) => {

            if (!this.stateHasProperty(state, statePropertyName))
                return state;

            const stateProperty = StateProperty.getInstance(action.payload);
            const change = this._getPropertyChange(state, statePropertyName, propertyKey, stateProperty);

            return this.updateState(state, change);
        };

        return handler;
    }

    getSuccessActionDefition(url, statePropertyName, propertyKey) {
        let sanitizedKey = null;

        if (propertyKey) {
            sanitizedKey = StatePropertyDictionary.sanitizeKey(propertyKey);
        }

        const definition = this._getNewActionDefinition(url, statePropertyName, sanitizedKey);
        definition.onSuccess = this._getOnSuccessHandler(statePropertyName, sanitizedKey);
        definition.onRequest = this._getOnRequestHandler(statePropertyName, sanitizedKey);

        return definition;
    }
}