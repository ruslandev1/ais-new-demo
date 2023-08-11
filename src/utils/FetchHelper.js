import getRequestHeaders from "./HeaderUtils";
import {BACKEND_URL} from "./Constants";
import {LOGOUT_USER} from "../actions/loginAction";

import store from '../index';
import {isEmpty} from "./Validator";

class fetchHelper {

    constructor(domainPort) {
        this._domainPort = domainPort;
    }


    fetchCustom(path, data, method) {
        let _method = 'GET';
        if (typeof method !== "undefined")
            _method = method;
        let _data = null;
        if (typeof _data !== "undefined")
            _data = data;


        return fetch(this._domainPort + path, {
                mode: 'cors',
                headers: getRequestHeaders(),
                method: _method,
                body: JSON.stringify(_data)
            }
        ).then(function (response) {
            if (!response.ok) {
                if (response.status === 401) {
                    store.dispatch({type: LOGOUT_USER});
                    // localStorage.removeItem(LOGIN_KEY_TOKEN);
                    // this.props.history.push('/');
                }

                // if (!isEmpty(response.statusText))
                //     return JSON.parse(response.statusText);

                if (response === undefined || isEmpty(response) || isEmpty(response.statusText))
                    throw new Error('Unexpected feature');

                let e = JSON.parse(response.statusText);
                throw Error(e.ResponseMessage);
            }
            return response.json();
        }).catch(reason => reason);
    }


    get domainPort() {
        return this._domainPort;
    }

    set domainPort(value) {
        this._domainPort = value;
    }
}

export default new fetchHelper(BACKEND_URL);
