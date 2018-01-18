
import * as ACTIONTYPES from '../action/actiontypes';

const defaultState = {
    isLoggedIn: false,
    data: {},
    status: null,
};
export default function user(state = defaultState, action) {
  
    switch (action.type) {
        case ACTIONTYPES.LOGGED_DOING:
            return {
                ...state,
                status: action.status,
            };
        case ACTIONTYPES.LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
                data: action.data,
                status: action.status,
            };
        case ACTIONTYPES.LOGGED_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                status: action.status,
            };
        default:
            return state;
    }

}