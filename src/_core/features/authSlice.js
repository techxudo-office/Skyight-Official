import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "./ApiHelper";


const initialState = {
  userData: null,
  isLoading: false,
  loginError: null,

  isLoadingForgotPassword: false,
  forgotPasswordError: null,

  isLoadingResetPassword: false,
  resetPasswordError: null,

  isLoadingRegister: false,
  registerError: null,

  isLoadingVerifyOTP: false,
  verifyOTPError: null,

  isLoadingResendCode: false,
  resendCodeError: null,

  isLoadingUserInfo: false,
  userInfoError: null,

  isUpdatingAccount: false,
  updateAccountError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
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
      })
      .addCase(register.pending, (state) => {
        state.isLoadingRegister = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoadingRegister = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoadingRegister = false;
        state.registerError = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoadingVerifyOTP = true;
        state.verifyOTPError = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isLoadingVerifyOTP = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoadingVerifyOTP = false;
        state.verifyOTPError = action.payload;
      })
      .addCase(resendCode.pending, (state) => {
        state.isLoadingResendCode = true;
        state.resendCodeError = null;
      })
      .addCase(resendCode.fulfilled, (state) => {
        state.isLoadingResendCode = false;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.isLoadingResendCode = false;
        state.resendCodeError = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoadingUserInfo = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoadingUserInfo = false;
        state.userData = {
          ...state.userData,
          user: action.payload,
        };
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoadingUserInfo = false;
        state.userInfoError = action.payload;
      })
      .addCase(updateAccount.pending, (state) => {
        state.isUpdatingAccount = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.isUpdatingAccount = false;
        state.userData = {
          ...state.userData,
          user: action.payload,
        };
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.isUpdatingAccount = false;
        state.updateAccountError = action.payload;
      });
  },
});

// Login
export const login = createAsyncThunk(
  "auth/login",
  (payload) =>
    makeRequest('post', '/api/login', {
      data: payload,
      successMessage: "Login Successfully",
      errorMessage: "Login failed. Please try again."
    })
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  (token) =>
    makeRequest('get', '/api/logout', {
      token,
      successMessage: "Logout Successfully",
      errorMessage: "Logout failed"
    })
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  (payload) =>
    makeRequest('post', '/api/forgot-password', {
      data: payload,
      successMessage: "Password reset link sent successfully",
      errorMessage: "Forgot password request failed"
    })
);

// Reset Password 
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  ({ token, payload }) =>
    makeRequest('post', `/api/reset-password/${token}`, {
      data: payload,
      successMessage: "Password reset successfully",
      errorMessage: "Password reset failed"
    })
);

// Register Company
export const register = createAsyncThunk(
  "auth/registerCompany",
  (payload) =>
    makeRequest('post', '/api/register-company', {
      data: payload,
      successMessage: "Registration successful. Verify OTP...",
      errorMessage: "Registration failed. Please try again."
    })
  // .catch(error => {
  //   const errorMsg = error.response?.data?.data?.errors
  //     ? Object.values(error.response.data.data.errors).join(', ')
  //     : error;
  //   return rejectWithValue(errorMsg);
  // })
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  (payload) => makeRequest('post', '/api/verify-verification-code', {
    data: payload,
    successMessage: "OTP Verified Successfully",
    errorMessage: "OTP verification failed"
  })
);

// Resend Verification Code
export const resendCode = createAsyncThunk(
  "auth/resendCode",
  (payload) => makeRequest('post', '/api/resend-verification-code', {
    data: payload,
    successMessage: "Verification code resent successfully",
    errorMessage: "Failed to resend verification code"
  })
);

// Get User Info
export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  (token) => makeRequest('get', '/api/me', {
    token,
    errorMessage: "Something went wrong. Please try again."
  })
);

// Update Account
export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  ({ token, data }) => makeRequest('put', '/api/user/update-account', {
    data,
    token,
    successMessage: "Account updated successfully",
    errorMessage: "Failed while updating your Account"
  })
);
export const { updateUserData } = authSlice.actions;
export default authSlice.reducer;
