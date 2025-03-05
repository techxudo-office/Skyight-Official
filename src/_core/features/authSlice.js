/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { VITE_API_URL } from '../../utils/ApiBaseUrl';

const initialState = {
  isLoading: false,
  authError: null,
  logoutError: null,
  isLogoutLoading: false,
  oneSignalExternalIdStatus: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.forgotMessage = action.payload?.msg;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.userError = action.payload;
    });
    builder.addCase(logoutUser?.pending, (state, action) => {
      state.isLogoutLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLogoutLoading = false;
      state.logoutError = action.payload?.msg;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLogoutLoading = false;
    });
  },
});

export const forgotPassword = createAsyncThunk(
  'auth//forgotPassword',
  async (data, thunkAPI) => {
    const headers = {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    };
    const url = `${BASE_URL}forget`;
    try {
      const resp = await axios.post(url, data, {
        headers: headers,
      });
      if (resp.data?.status == 'success') {
        thunkAPI.dispatch(
          showToast({
            visible: true,
            text: 'Email Sent Successfully',
            type: 'success',
          }),
        );
      }
      return resp.data;
    } catch (error) {
      console.log(error.message, 'err');
      thunkAPI.dispatch(
        showToast({
          visible: true,
          text: error?.response?.message,
          type: 'error',
        }),
      );
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth//LOGOUT',
  async ({ token }, thunkAPI) => {
    const url = `${BASE_URL}logout`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const resp = await axios.post(url, '', {
        headers: headers,
      });
      if (resp.data.status === 'success') {
        thunkAPI.dispatch(
          showToast({
            visible: true,
            text: resp?.data?.response?.message,
            type: 'success',
          }),
        );
        thunkAPI.dispatch(logout());
      }
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(
        showToast({
          visible: true,
          text: error?.response?.data?.message,
          type: 'error',
        }),
      );
      console.log(error, 'eroo');
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const { } = authSlice.actions;
export default authSlice.reducer;
