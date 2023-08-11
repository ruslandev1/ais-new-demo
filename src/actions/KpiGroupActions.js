import {
    KPI_FETCH_CHANNELS_FAILURE, KPI_FETCH_GROUPS_FAILURE,
    KPI_FETCH_GROUPS_REQUEST,
    KPI_FETCH_GROUPS_SUCCESS, KPI_INVALIDATE_GROUPS
} from "../constants/KpiActionTypes";
import {BACKEND_URL} from "../utils/Constants";
import {normalize, schema} from "normalizr";
import {avrFetch} from "../utils/AvroraFetch";

export function requestKpiGroups() {
    return {
        type: KPI_FETCH_GROUPS_REQUEST,
    }
}

export function receiveKpiGroups(json) {
    if(typeof json === "undefined" || typeof json.data === "undefined") {
        return {
            type: KPI_FETCH_GROUPS_FAILURE,
            receivedAt: Date.now()
        }
    }
    const group = new schema.Entity('groups', {}, { idAttribute: 'groupId' });
    const normalizedData = normalize(json.data, {
        groups: [group],
    });

    return {
        type: KPI_FETCH_GROUPS_SUCCESS,
        items: normalizedData.entities.groups,
        keys: normalizedData.result.groups,
        receivedAt: Date.now()
    }
}

function shouldFetchKpiGroups(state) {
    if (!state.kpi.groupsData.items || !state.kpi.groupsData.lastUpdated) {
        return true
    } else if (!state.kpi.groupsData.isFetching) {
        return false
    } else {
        return !state.kpi.groupsData.didInvalidate
    }
}

export function invalidateKpiGroups() {
    return {
        type: KPI_INVALIDATE_GROUPS,
    }
}

export function fetchKpiGroups() {
    return function (dispatch) {
        dispatch(requestKpiGroups());
        return avrFetch(BACKEND_URL + '/api/KPIAdmin/GetGroups')
            .then(
                response => response.json(),
                error => console.log('An error occurred on fetchKpiGroups action.', error)
            )
            .then(json => dispatch(receiveKpiGroups(json)))
    }
}

export function fetchKpiGroupsIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchKpiGroups(getState())) {
            console.log("Needed!");
            // Dispatch a thunk from thunk!
            return dispatch(fetchKpiGroups());
        }
        else {
            console.log("No need!");
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}