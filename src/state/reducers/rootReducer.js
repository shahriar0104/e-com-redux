import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
    productReducer,
    cartReducer,
    modalReducer
});

export default rootReducer
