import {
    KPI_FETCH_ATTRIBUTES_REQUEST, KPI_FETCH_ATTRIBUTES_SUCCESS,
    KPI_INVALIDATE_ATTRIBUTES} from "../constants/KpiActionTypes";
import {BACKEND_URL} from "../utils/Constants";
import {normalize, schema} from "normalizr";
import {avrFetch} from "../utils/AvroraFetch";

export function requestKpiAttributes() {
    return {
        type: KPI_FETCH_ATTRIBUTES_REQUEST,
    }
}

export function receiveKpiAttributes(json) {
    const attrib = new schema.Entity('attributes', {}, { idAttribute: 'attribId' });
    const normalizedData = normalize(json.data, {
        attributes: [attrib],
    });

    return {
        type: KPI_FETCH_ATTRIBUTES_SUCCESS,
        items: normalizedData.entities.attributes,
        keys: normalizedData.result.attributes,
        receivedAt: Date.now()
    }
}

function shouldFetchKpiAttributes(state) {
    if (!state.kpi.attributesData.items || !state.kpi.attributesData.lastUpdated) {
        return true
    } else if (!state.kpi.attributesData.isFetching) {
        return false
    } else {
        return !state.kpi.attributesData.didInvalidate
    }
}

export function invalidateKpiAttributes() {
    return {
        type: KPI_INVALIDATE_ATTRIBUTES,
    }
}

export function fetchKpiAttributes() {
    return function (dispatch) {
        dispatch(requestKpiAttributes());
        return avrFetch(BACKEND_URL + '/api/KPIAdmin/GetAttributes')
            .then(
                response => response.json(),
                error => console.log('An error occurred on fetchKpiGroups action.', error)
            )
            .then(json => dispatch(receiveKpiAttributes(json)))
    }
}

export function fetchKpiAttributesIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchKpiAttributes(getState())) {
            console.log("Needed!");
            // Dispatch a thunk from thunk!
            return dispatch(fetchKpiAttributes());
        }
        else {
            console.log("No need!");
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}