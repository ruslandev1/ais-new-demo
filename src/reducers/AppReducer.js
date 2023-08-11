import {APP_SET_MODULE_TITLE} from "../constants/AppActionTypes";

const initialState = {
    moduleTitle: "Ana səhifə",
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case APP_SET_MODULE_TITLE:
            return Object.assign({}, state, {
                moduleTitle: action.moduleTitle
            });

        default:
            return state
    }
}

export default appReducer;