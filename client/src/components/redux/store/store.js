import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ProductsReducer from "../slices/productsSlice";
const reducer = combineReducers({ ProductsState: ProductsReducer });
export default configureStore({
  reducer,
  //middleware - to run actions in asyncronous
  middleware: [thunk],
});
