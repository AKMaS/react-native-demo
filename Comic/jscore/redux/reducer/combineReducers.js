
import { combineReducers } from 'redux';
import loginreducer from './loginreducer';
import fetchdatareducer from './fetchdatareducer'
import collectBookReducer from './collectbookrudecer'
let rootReducer = combineReducers({
    login: loginreducer,
    fetch: fetchdatareducer,
    collected: collectBookReducer,
});

export default rootReducer;