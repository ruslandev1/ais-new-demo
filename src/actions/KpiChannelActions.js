import {
    KPI_FETCH_CHANNELS_FAILURE,
    KPI_FETCH_CHANNELS_REQUEST, KPI_FETCH_CHANNELS_SUCCESS,
    KPI_INVALIDATE_CHANNELS
} from "../constants/KpiActionTypes";
import {BACKEND_URL} from "../utils/Constants";
import {normalize, schema} from "normalizr";
import {avrFetch} from "../utils/AvroraFetch";

export function requestKpiChannels() {
    return {
        type: KPI_FETCH_CHANNELS_REQUEST,
    }
}

export function receiveKpiChannels(json) {
    if(typeof json === "undefined" || typeof json.data === "undefined") {
        return {
            type: KPI_FETCH_CHANNELS_FAILURE,
            receivedAt: Date.now()
        }
    }

    const channel = new schema.Entity('channels', {}, { idAttribute: 'channelId' });
    const normalizedData = normalize(json.data, {
        channels: [channel],
    });

    return {
        type: KPI_FETCH_CHANNELS_SUCCESS,
        items: normalizedData.entities.channels,
        keys: normalizedData.result.channels,
        receivedAt: Date.now()
    }
}

function shouldFetchKpiChannels(state) {
    if (!state.kpi.channelsData.items || !state.kpi.channelsData.lastUpdated) {
        return true
    } else if (!state.kpi.channelsData.isFetching) {
        return false
    } else {
        return !state.kpi.channelsData.didInvalidate
    }
}

export function invalidateKpiChannels() {
    return {
        type: KPI_INVALIDATE_CHANNELS,
    }
}

export function fetchKpiChannels() {
    return function (dispatch) {
        dispatch(requestKpiChannels());
        return avrFetch(BACKEND_URL + '/api/KPIAdmin/GetChannels')
            .then(
                response => response.json(),
                error => console.log('An error occurred on fetchKpiGroups action.', error)
            )
            .then(json => dispatch(receiveKpiChannels(json)))
    }
}

export function fetchKpiChannelsIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchKpiChannels(getState())) {
            console.log("Needed!");
            // Dispatch a thunk from thunk!
            return dispatch(fetchKpiChannels());
        }
        else {
            console.log("No need!");
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}