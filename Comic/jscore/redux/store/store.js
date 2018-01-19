import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native';
import rootReducer from '../reducer/combineReducers';

const loggerMiddleware = createLogger();
const middle = [thunkMiddleware];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(...middle))
    let persistor = persistStore(store)
    return { store, persistor }
}


