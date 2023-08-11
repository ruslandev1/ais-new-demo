export function isEmpty(obj) {
    let name;
    for (name in obj ) {
        return false;
    }
    return true;
}

export function isValidPassword(psw) {
    return psw.length > 3;
}
