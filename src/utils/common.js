import store from '../main';
import {
    PRIV_KPIADMIN_AMB_OPERATOR,
    PRIV_KPIADMIN_MAIN_OPERATOR,
    PRIV_KPIADMIN_MANAGER,
    PRIV_KPIADMIN_MENU,
    PRIV_KPIADMIN_ROUTE_OPERATOR
} from "../constants/PrivilegeTypes";

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function reverseString(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

/**
 * @return {boolean}
 */
export function UserHasAccessInfoId(arrayIds) {
    console.log("Checking UserHasAccessInfoId for "  + arrayIds);
    if(store == null || !store) {
        console.log("Store is empty for UserHasAccessInfoId");
        return false;
    }

    let state = store.getState();

    if(!state.accessState || !state.accessState.accessInfo) {
        console.log("returns false..");
        return false;
    }

    let found = false;
    arrayIds.forEach(function (id) {
        if (!found && state.accessState.accessInfo[id]) found = true;
    });

    console.log("Result of search: " + found);

    console.log(state);
    console.log("returns " + found + "...");
    return found;
}

export function UserHasAccess(privType) {
    console.log("Requesting for access: " + privType);
    console.log(store);

    switch (privType) {
        case PRIV_KPIADMIN_MENU:
            return UserHasAccessInfoId([5]);

        case PRIV_KPIADMIN_MAIN_OPERATOR:
            return UserHasAccessInfoId([113]);

        case PRIV_KPIADMIN_MANAGER:
            return UserHasAccessInfoId([61]);

        case PRIV_KPIADMIN_ROUTE_OPERATOR:
            return UserHasAccessInfoId([116]);

        case PRIV_KPIADMIN_AMB_OPERATOR:
            return UserHasAccessInfoId([235]);
        default:
            return false;
    }
}