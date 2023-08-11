import {
    KPI_FETCH_ATTRIBUTES_REQUEST, KPI_FETCH_ATTRIBUTES_SUCCESS, KPI_FETCH_CHANNELS_REQUEST, KPI_FETCH_CHANNELS_SUCCESS,
    KPI_FETCH_GROUPS_REQUEST,
    KPI_FETCH_GROUPS_SUCCESS, KPI_FETCH_PERSON_TYPES_SUCCESS,
    KPI_INVALIDATE_ATTRIBUTES, KPI_INVALIDATE_CHANNELS,
    KPI_INVALIDATE_GROUPS
} from "../constants/KpiActionTypes";
import {combineReducers} from "redux";

function generalReducer(
    state = {
        personTypes: [],
        config: [],
    },
    action
) {
    switch (action.type) {
        case KPI_FETCH_PERSON_TYPES_SUCCESS:
            return Object.assign({}, state, {
                personTypes: action.items,
            });
        default:
            return state
    }
}

function channelsReducer(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        keys: []
    },
    action
) {
    switch (action.type) {
        case KPI_INVALIDATE_CHANNELS:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case KPI_FETCH_CHANNELS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case KPI_FETCH_CHANNELS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
                keys: action.keys,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function groupsReducer(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        keys: []
    },
    action
) {
    switch (action.type) {
        case KPI_INVALIDATE_GROUPS:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case KPI_FETCH_GROUPS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case KPI_FETCH_GROUPS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
                keys: action.keys,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function attributesReducer(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        keys: []
    },
    action
) {
    switch (action.type) {
        case KPI_INVALIDATE_ATTRIBUTES:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case KPI_FETCH_ATTRIBUTES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case KPI_FETCH_ATTRIBUTES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
                keys: action.keys,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}


const KpiReducer = combineReducers({
    generalData: generalReducer,
    channelsData: channelsReducer,
    groupsData: groupsReducer,
    attributesData: attributesReducer
});

export default KpiReducer;