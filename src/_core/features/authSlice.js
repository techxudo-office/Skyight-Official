import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiBaseUrl";

const initialState = {
  userData: null,
  isLoading: false,
  isLoadingForgotPassword: false,
  loginError: null,
  forgotPasswordError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        if (action.payload?.token) {
          localStorage.setItem("auth_token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        localStorage.removeItem("auth_token");
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoadingForgotPassword = true;
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoadingForgotPassword = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoadingForgotPassword = false;
        state.forgotPasswordError = action.payload;
      });
  },
});

export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Login Error:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (token, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/logout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 200) {
      return response.data.message;
    }
  } catch (error) {
    console.error("Logout Error:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-password`, payload);
      if (response.status === 200) {
        return response.data.message;
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Forgot password request failed"
      );
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
