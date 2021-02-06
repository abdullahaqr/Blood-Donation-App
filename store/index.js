import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer,applyMiddleware(thunk))
const persistor = persistStore(store)

export {
    store,
    persistor
}
