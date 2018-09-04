export class BaseReducer {

    static updateState(state, action) {

        if (!state) {
            state = null;
        }

        if (action.actionDefinition !== undefined) {
            return action.actionDefinition.reducer(action, state);
        }

        return state;
    }
}