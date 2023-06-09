import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const reducer = combineReducers({});
export default configureStore({
  reducer,
  //middleware - to run actions in asyncronous
  middleware: [thunk],
});
