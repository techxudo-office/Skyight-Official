import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiBaseUrl";
import toast from "react-hot-toast";
import makeRequest from "./ApiHelper";


const initialState = {
  notifications: [],
  announcements: [],
  isLoadingNotifications: false,
  isLoadingAnnouncements: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoadingNotifications = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoadingNotifications = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoadingNotifications = false;
      })
      .addCase(getAnnouncements.pending, (state) => {
        state.isLoadingAnnouncements = true;
      })
      .addCase(getAnnouncements.fulfilled, (state, action) => {
        state.isLoadingAnnouncements = false;
        state.announcements = action.payload;
      })
      .addCase(getAnnouncements.rejected, (state, action) => {
        state.isLoadingAnnouncements = false;
      })

  },
});

// Get Notifications
export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  (token) => makeRequest('get', '/api/notification?isMaster=true', {
    token,
    errorMessage: "Failed to fetch notifications"
  })
);

// Get Announcements
export const getAnnouncements = createAsyncThunk(
  "notification/getAnnouncements",
  (token) => makeRequest('get', '/api/getAnnouncements', {
    token,
    errorMessage: "Failed to fetch announcements"
  })
);

export default notificationSlice.reducer;
