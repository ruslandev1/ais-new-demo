import {BACKEND_URL} from "../utils/Constants";
import {avrFetch, logError, readResponseAsJSON, validateResponse} from "../utils/AvroraFetch";
import {receiveKpiAttributes, requestKpiAttributes} from "./KpiAttributeActions";
import {receiveKpiGroups, requestKpiGroups} from "./KpiGroupActions";
import {receiveKpiChannels, requestKpiChannels} from "./KpiChannelActions";
import {KPI_FETCH_PERSON_TYPES_SUCCESS} from "../constants/KpiActionTypes";

export function fetchKpiGeneralData() {
    return function (dispatch) {
        dispatch(requestKpiChannels());
        dispatch(requestKpiGroups());
        dispatch(requestKpiAttributes());

        return avrFetch(BACKEND_URL + '/api/KPIAdmin/GetEssentials')
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(json => {
                dispatch(receiveKpiAttributes(json));
                dispatch(receiveKpiChannels(json));
                dispatch(receiveKpiPersonTypes(json));
                dispatch(receiveKpiGroups(json));

            })//.catch(logError);
    }
}

function receiveKpiPersonTypes(json) {
    return {
        type: KPI_FETCH_PERSON_TYPES_SUCCESS,
        items: json.data.person_types,
        receivedAt: Date.now()
    }
}