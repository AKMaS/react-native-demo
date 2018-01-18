import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistCombineReducers, autoRehydrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducers from '../reducer/combineReducers';

const loggerMiddleware = createLogger();
const middle = [thunkMiddleware, loggerMiddleware];

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    const storeWithMiddleware = applyMiddleware(...middle)(createStore);
    // let store = createStore(persistReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}


// const storeWithMiddleware = applyMiddleware(...middle)(createStore);
// //redux-persist
// const persistConfig = {
//     key: 'root',
//     storage: storage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducers)

// export default function configureStore() {

//     let store = createStore(persistedReducer);
//     let persistor = persistStore(store);

//     return { store, persistor }
// }
