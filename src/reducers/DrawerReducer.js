import {CLOSE_DRAWER, OPEN_DRAWER} from "../actions/drawerActionTypes";

const initalState = {
    drawerOpen: false
};

export const DrawerReducer = function (state = initalState, action) {
    switch (action.type) {
        case OPEN_DRAWER:
            return Object.assign({}, state, {drawerOpen: true});
        case CLOSE_DRAWER:
            return Object.assign({}, state, {drawerOpen: false});

        default:
            return state;
    }
};
