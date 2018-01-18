'use strict'
import *  as ACTIONTYPE from './actiontypes';

// 以下是关于登录的Action
export function logIn(opt) {
    return (dispatch) => {
        dispatch(_logIning());
        return fetch('http://a121.baopiqi.com/api/mh/getCartoonInfo.php?id=123')
            .then(response => response.json())
            .then(json => dispatch(_logInSucc(json)))
            .catch(e => dispatch(_logInErr(e)))
    }
}
function _logIning() {
    return {
        type: ACTIONTYPE.LOGGED_DOING,
        status: 'fetching',

    }
}
function _logInSucc(json) {
    return {
        type: ACTIONTYPE.LOGGED_IN,
        data: json,
        status: 'succeed',

    }
}

function _logInErr(e) {
    return {
        type: ACTIONTYPE.LOGGED_ERROR,
        status: 'error' + e
    }
}
export function _logOut(e) {
    return {
        type: ACTIONTYPE.LOGGED_OUT,
    }
}
 