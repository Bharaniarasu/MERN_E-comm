import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ProductsReducer from "../slices/productsSlice";
import ProductReducer from "../slices/productSlice";
import AuthReducer from "../slices/authSlice";
const reducer = combineReducers({
  ProductsState: ProductsReducer,
  ProductState: ProductReducer,
  AuthState: AuthReducer,
});
export default configureStore({
  reducer,
  //middleware - to run actions in asyncronous
  middleware: [thunk],
});
