import { combineReducers } from "redux";
import {  Loading, productReducer,SelectedProductReducer } from "./productReducer";

const reducer = combineReducers(
    {
        allproducts :productReducer,
        product:SelectedProductReducer,
        Loading:Loading,
    }
)

export default reducer;