import {combineReducers} from "redux";
import MemberReducer from "./Services/Data/Api/Member/MemberReducer";
import ContentReducer from "./Services/Data/Api/Content/ContentReducer";
import CompareReducer from "./Services/Data/Api/Compare/CompareReducer";
import {SystemReducer} from "./Services/Data/Api/System/SystemReducer";
import {StateProperty} from "./Services/Data/Models/StateProperty";

// Combine Reducers
const reducers = combineReducers({
    member: MemberReducer,
    compare: CompareReducer,
    content: ContentReducer,
    system: SystemReducer.getState
});

export const rootReducer = (state, action) => {
    if (action.type === "LOG_OUT_SUCCESS") {
        state = {
            form: state.form
        };
        StateProperty.propertiesRequestedFromServer = [];
    }
    
    return reducers(state, action);
}
