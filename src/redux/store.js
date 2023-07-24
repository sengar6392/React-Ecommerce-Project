import { createStore } from "redux";
import { products } from "../data";
import { rootReducer } from "./reducers";
const store=createStore(rootReducer)

export default store