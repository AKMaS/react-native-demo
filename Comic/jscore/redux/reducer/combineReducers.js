
import { combineReducers } from 'redux';
import loginreducer from './loginreducer';
import fetchdatareducer from './fetchdatareducer'
let rootReducer = combineReducers({
    login: loginreducer,
    fetch: fetchdatareducer
    
});

export default rootReducer;