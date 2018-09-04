import { StateProperty } from "../../Models/StateProperty";
import { BaseReducer } from "../Base/BaseReducer";

export class SystemReducer {

    static get initialState() {
        return {
            loginNotification: new StateProperty(),
            idNotification: new StateProperty()
        };
    }

    static getState = (state = SystemReducer.initialState, action) => {
        return BaseReducer.updateState(state, action);
    }
}

