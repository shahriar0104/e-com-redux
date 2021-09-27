import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createTransform from "redux-persist/es/createTransform";

const mapTransformer = config =>
    createTransform(
        (state) => {
            return {...state, cartItemList: Array.from(state.cartItemList)}
        },
        (state) => {
            return {...state, cartItemList: new Map(state.cartItemList)}
        },
        config
    );


const persistConfig = {
    key: 'root',
    storage,
    transforms: [mapTransformer({whitelist: 'cartReducer'})],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const enhancer = applyMiddleware(thunkMiddleware);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);