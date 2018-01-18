'use strict'
import *  as ACTIONTYPE from './actiontypes';

let fetchActions = {
    // // 精品页
    // fetchPrime(opt) {
    //     return (dispatch) => {
    //         dispatch(_fetchListDataDoing())
    //         return fetch(opt)
    //     }
    // }
    // 添加一个pagetype参数，以在不同的tab使用相同的fetchListData方法是进行区分
    fetchListData(opt, pagetype) {
        return (dispatch) => {
            dispatch(_fetchListDataDoing(pagetype));
            return fetch(opt)
                .then(response => response.json())
                .then(json => dispatch(_fetchListDataSucceed(json, pagetype)))
                .catch(e => dispatch(_fetchListDataError(e, pagetype)));
        }
    },
}
export default fetchActions;
// 关于获取内容的Action
// export function fetchData(opt, ) {
//     return (dispatch) => {
//         dispatch(_fetchDataing());
//         return fetch(opt)
//             .then(response => response.json())
//             .then(json => dispatch(_fetchSucc(json)))
//             .catch(e => dispatch(_fetchErr(e)));
//     }
// }
function _fetchListDataDoing(pagetype) {
    return {
        type: `FETCH_${pagetype}_DOING`,
        status: '0',
        data: []
    }
}
function _fetchListDataSucceed(json, pagetype) {
    return {
        type: `FETCH_${pagetype}_SUCCEED`,
        // type: ACTIONTYPE.FETCH_ + pagetype + _SUCCEED,
        status: '1',
        data: json,
    }
}
function _fetchListDataError(e, pagetype) {
    return {
        type: `FETCH_${pagetype}_ERROR`,
        status: '-1',
        recommend: 'fetch error:' + e,
    }
}