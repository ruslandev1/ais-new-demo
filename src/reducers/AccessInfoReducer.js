import {
    APP_FETCH_USERACCESS_INFO_REQUEST,
    APP_FETCH_USERACCESS_INFO_SUCCESS,
    APP_INVALIDATE_USERACCESS
} from "../constants/AppActionTypes";

function accessInfoReducer(
    state = {
        loaded: false,
        isFetching: false,
        didInvalidate: false,
        accessInfo: {},
    },
    action
) {
    switch (action.type) {
        case APP_INVALIDATE_USERACCESS:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case APP_FETCH_USERACCESS_INFO_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case APP_FETCH_USERACCESS_INFO_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                loaded: true,
                accessInfo: action.accessInfo,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

export default accessInfoReducer;