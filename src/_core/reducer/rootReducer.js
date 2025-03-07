/** @format */

"use client";

import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    storage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;
