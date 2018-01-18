
import * as ACTIONTYPES from '../action/actiontypes';

let defaultState = {
    primePage: {
        status: '',
        data: [],
    },
    rankPage: {
        status: '',
        data: [],
    },
    recommendPage: {
        status: '',
        data: [],
    },
    vipPage: {
        status: '',
        data: [],
    },
}

export default function fetchReducer(state = defaultState, action) {
    console.log(action.type);
    console.log(action.status);
    // console.log(action.data)
    switch (action.type) {
        case ACTIONTYPES.FETCH_RECOMMEND_DOING:
        case ACTIONTYPES.FETCH_RECOMMEND_SUCCEED:
        case ACTIONTYPES.FETCH_RECOMMEND_ERROR:
            return {
                ...state,
                recommendPage: {
                    ...state.recommendPage,
                    status: action.status,
                    data: action.data,
                },
            };
        case ACTIONTYPES.FETCH_PRIME_DOING:
        case ACTIONTYPES.FETCH_PRIME_SUCCEED:
        case ACTIONTYPES.FETCH_PRIME_ERROR:
            return {
                ...state,
                primePage: {
                    ...state.primePage,
                    status: action.status,
                    data: action.data,
                }
            };
        case ACTIONTYPES.FETCH_RANK_DOING:
        case ACTIONTYPES.FETCH_RANK_SUCCEED:
        case ACTIONTYPES.FETCH_RANK_ERROR:
            return {
                ...state,
                rankPage: {
                    ...state.rankPage,
                    status: action.status,
                    data: action.data,
                }
            };
        case ACTIONTYPES.FETCH_VIP_DOING:
        case ACTIONTYPES.FETCH_VIP_SUCCEED:
        case ACTIONTYPES.FETCH_VIP_ERROR:
            return {
                ...state,
                vipPage: {
                    ...state.vipPage,
                    status: action.status,
                    data: action.data,
                }
            }
        // case ACTIONTYPES.FETCH_RECOMMEND_DOING:
        //     return {
        //         ...state,
        //         recommendPage: {
        //             ...state.recommendPage,
        //             status: action.status,
        //         },
        //     };
        // case ACTIONTYPES.FETCH_RECOMMEND_SUCCEED:
        //     return {
        //         ...state,
        //         recommendPage: {
        //             ...state.recommendPage,
        //             status: action.status,
        //             data: action.recommend,
        //         },
        //     };
        // case ACTIONTYPES.FETCH_RECOMMEND_ERROR:
        //     return {
        //         ...state,
        //         recommendPage: {
        //             ...state.recommendPage,
        //             data: action.recommend,
        //             status: action.status,
        //         }

        //     };
        default:
            return state;
    }
}