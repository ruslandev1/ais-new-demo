import {
    APP_FETCH_USERACCESS_INFO_REQUEST,
    APP_FETCH_USERACCESS_INFO_SUCCESS, APP_INVALIDATE_USERACCESS,
    APP_SET_MODULE_TITLE
} from "../constants/AppActionTypes";
import {avrFetch} from "../utils/AvroraFetch";
import {BACKEND_URL} from "../utils/Constants";

export function setModuleTitle(moduleTitle) {
    return {
        type: APP_SET_MODULE_TITLE,
        moduleTitle: moduleTitle,
    }
}

export function requestAppUserAccessInfo() {
    return {
        type: APP_FETCH_USERACCESS_INFO_REQUEST,
    }
}

export function receiveAppUserAccessInfo(json) {
    console.log(json)
    let accInfo = {};
    if(json !== undefined && json.code === 1 && json.data !== null && json.data.access_info != null) {
        Object.keys(json.data.access_info).map((accInfoId, index) => {
            accInfo[accInfoId] = true;
        });
    }

    return {
        type: APP_FETCH_USERACCESS_INFO_SUCCESS,
        accessInfo: accInfo,
        receivedAt: Date.now()
    }
}

function shouldFetchAppUserAccessInfo(state) {
    console.log(state)
    if (!state.accessState || !state.accessState.accessInfo) {
        console.log("bir")
        return true
    }
    else if (state.accessState.isFetching) {
        console.log("uc")
        return false
    }
    else if(!state.accessState.loaded) {
        console.log("iki")
        return true;
    }
    else {
        console.log("dird")
        return state.accessState.didInvalidate
    }
}

export function invalidateAppUserAccessInfo() {
    return {
        type: APP_INVALIDATE_USERACCESS,
    }
}

export function fetchAppUserAccessInfo() {
    return function (dispatch) {
        dispatch(requestAppUserAccessInfo());
        return avrFetch(BACKEND_URL + '/api/User/GetAccessInfo')
            .then(
                response => response.json(),
                error => console.log('An error occurred on fetchKpiGroups action.', error)
            )
            .then(json => dispatch(receiveAppUserAccessInfo(json)))
    }
}

export function fetchAppUserAccessInfoIfNeeded() {
    return (dispatch, getState) => {
        console.log(getState())
        if(shouldFetchAppUserAccessInfo(getState())) {
            console.log("Needed!");
            // Dispatch a thunk from thunk!
            return dispatch(fetchAppUserAccessInfo());
        }
        else {
            console.log("No need!");
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
