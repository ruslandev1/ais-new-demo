// action types
import { KPI_FETCH_CHANNELS_REQUEST } from "../constants/KpiActionTypes";
import {
  avrFetch,
  readResponseAsJSON,
  validateResponse,
} from "../utils/AvroraFetch";
import { BACKEND_URL } from "../utils/Constants";
import { isEmpty } from "../utils";

export const MENU_LIST_FETCH_SUCCESS = "MENU_LIST_FETCH_SUCCESS";
export const MENU_LIST_INVALIDATE = "MENU_LIST_INVALIDATE";
export const MENU_LIST_FETCH_REQUEST = "MENU_LIST_FETCH_REQUEST";
export const MENU_GROUP_SHOW = "MENU_GROUP_SHOW";

// reducer
export default function menuListReducer(
  state = {
    loaded: false,
    isFetching: false,
    didInvalidate: false,
    menuGroupShow: {},
  },
  action = {}
) {
  switch (action.type) {
    case MENU_LIST_INVALIDATE:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case MENU_LIST_FETCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case MENU_LIST_FETCH_SUCCESS:
      console.log(action);
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        didInvalidate: false,
        loaded: true,
      });
    case MENU_GROUP_SHOW:
      console.log(action);
      const val =
        state.menuGroupShow[action.payload.accInfoId] == null ||
        state.menuGroupShow[action.payload.accInfoId] === undefined
          ? true
          : !state.menuGroupShow[action.payload.accInfoId];

      return {
        ...state,
        menuGroupShow: {
          ...state.menuGroupShow,
          [action.payload.accInfoId]: val,
        },
      };
    default:
      return state;
  }
}

export function invalidateMenuListInfo() {
  return {
    type: MENU_LIST_INVALIDATE,
  };
}

export function requestMenuListInfo() {
  return {
    type: MENU_LIST_FETCH_REQUEST,
  };
}

// action creator
export function setMenuList(menuList) {
  return {
    type: MENU_LIST_FETCH_SUCCESS,
    payload: menuList,
  };
}

export function setMenuGroupShow(data) {
  return {
    type: MENU_GROUP_SHOW,
    payload: data,
  };
}

function shouldFetchMenuInfo(state) {
  console.log(state);
  if (!state.menuList) {
    console.log("tbir");
    return true;
  } else if (state.menuList.isFetching) {
    console.log("tuc");
    return false;
  } else if (!state.menuList.loaded) {
    console.log("tiki");
    return true;
  } else {
    console.log("tdird");
    return state.menuList.didInvalidate;
  }
}

export function fetchMenuListInfo() {
  return function (dispatch) {
    dispatch(requestMenuListInfo());
    return avrFetch(BACKEND_URL + "/api/AccPool/GetMenuList")
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(
        (response) => {
          if (!isEmpty(response) && response.success === true) {
            dispatch(setMenuList(response.data));
          }
        },
        (error) =>
          console.log("An error occurred on fetchKpiGroups action.", error)
      );
  };
}

export function fetchMenuListInfoIfNeeded() {
  console.log("fetchMenuListInfoIfNeeded...");
  return (dispatch, getState) => {
    console.log(getState());
    if (shouldFetchMenuInfo(getState())) {
      console.log("Needed!");
      // Dispatch a thunk from thunk!
      return dispatch(fetchMenuListInfo());
    } else {
      console.log("No need!");
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
