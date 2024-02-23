import { combineReducers, configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlice';
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user : useReducer})

const persistConfig = {
    key: "root",
    storage,
    version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store)