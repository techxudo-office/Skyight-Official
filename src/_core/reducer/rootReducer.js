/** @format */

"use client";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import roleReducer from "../features/roleSlice";
import ticketReducer from "../features/ticketSlice";
import bookingReducer from "../features/bookingSlice";
import transactionReducer from "../features/transactionSlice";
import notificationReducer from "../features/notificationSlice";
import historyReducer from "../features/historySlice"

/** @format */
"use client";

// Import all reducers...

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["userData"]
};

const bookingConfig = {
  key: "booking",
  storage,
  whitelist: ["allFormData", "searchForm", "prevTraveller", "disableTravelers"]
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  role: roleReducer,
  ticket: ticketReducer,
  booking: persistReducer(bookingConfig, bookingReducer),
  transaction: transactionReducer,
  notification: notificationReducer,
  history: historyReducer
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    // Return fresh state first
    const newState = appReducer(undefined, action);

    // Queue storage cleanup
    storage.removeItem("persist:auth");
    storage.removeItem("persist:booking");

    // Reset _persist metadata
    return {
      ...newState,
      _persist: {
        version: -1,
        rehydrated: false
      }
    };
  }

  return appReducer(state, action);
};

// Wrap root reducer with persist
const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth", "booking"] // No root-level persistence
  },
  rootReducer
);

export default persistedReducer;