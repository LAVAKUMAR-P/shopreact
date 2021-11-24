import { combineReducers } from "redux";
import { productReducer,SelectedProductReducer } from "./productReducer";

const reducer = combineReducers(
    {
        allproducts :productReducer,
        product:SelectedProductReducer,
    }
)

export default reducer;