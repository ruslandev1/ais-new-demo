import getRequestHeaders from "../utils/HeaderUtils";
import {BACKEND_URL} from "../utils/Constants";
import {fetchAppUserAccessInfo, invalidateAppUserAccessInfo} from "./AppStateActions";
import {avrFetch, readResponseAsJSON, validateResponse} from "../utils/AvroraFetch";
import {invalidateMenuListInfo} from "../reducers/MenuReducer";

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// LOGIN ACTIONS
function logInRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

function logInSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token,
    }
}

function logInFailure(err) {
    console.log('logInFailure: ', err);
    return {
        type: LOGIN_FAILURE,
        error: err
    }
}


export function setCurrentUser(token) {
    return {
        type: SET_CURRENT_USER,
        token
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}

export function authenticate(loginUser) {
    console.log('authenticate', loginUser);
    return (dispatch) => {
        dispatch(invalidateAppUserAccessInfo());
        dispatch(invalidateMenuListInfo());
        dispatch(logInRequest());
        return avrFetch(BACKEND_URL + '/api/User/Auth',
            {
                mode: 'cors',
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify(loginUser)
            }, ['Authorization', 'Accept'])
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (result) => {
                    console.log('result: ', result);
                    if (result.success) {
                        dispatch(logInSuccess(result.data));
                    }
                    else {
                        dispatch(logInFailure({error: result.responseMessage}));
                    }

                },
                (error) => {
                    alert(error.message);
                    dispatch(logInFailure({error: error.message}));
                }
            );
    }
}

export function login(data) {
    return dispatch => {
        return fetch(BACKEND_URL + '/api/User/Auth', {
                mode: 'cors',
                headers: getRequestHeaders(),
                method: 'POST',
                body: JSON.stringify(data)
            }
        ).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(jsonRes => {
            if (!jsonRes.success)
                return jsonRes;
            //throw Error(jsonRes.responseMessage);

            dispatch(setCurrentUser(jsonRes.data));
            dispatch(fetchAppUserAccessInfo());
        }).finally(() => {

        });
    };
}


export function logout() {
    return dispatch => {
        return fetch(BACKEND_URL + '/api/User/logout', {
                mode: 'cors',
                headers: getRequestHeaders(),
                method: 'GET',
                // Todo Burda method GET olmasi lazimdi, Mock proqrama gore POST qoymali olduq, NATO MOCK proqram style
                //body: JSON.stringify(data)
            }
        ).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(jsonRes => {
        }).finally(() => {
            dispatch(logoutUser());
        })
    };
}
