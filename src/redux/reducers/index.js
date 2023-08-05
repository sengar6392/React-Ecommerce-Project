import { combineReducers } from "redux";
import { productsReducer,cartReducer } from "./reducer";
export const rootReducer=combineReducers({
    productsReducer,
    cartReducer
})