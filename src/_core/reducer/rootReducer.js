/** @format */

"use client";

import authReducer from '../features/authSlice';
import counterReducer from "../features/counterSlice";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const appReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    storage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;
