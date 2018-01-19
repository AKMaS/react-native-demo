
import * as ACTIONTYPES from '../action/actiontypes';
// { id, name,icon }
const defaultState = {
    data: [],
    status: null,
};
export default function CollectBookReducer(state = defaultState, action) {
    console.log('reduce')
    console.log(state.data.indexOf(action.data))
    switch (action.type) {
        case ACTIONTYPES.COLLECT_BOOK_SUCCEED:
            return {
                ...state,
                status: action.status,
                data: [...state.data, action.data]
            }
        default:
            return state;
    }

}