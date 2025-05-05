import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiBaseUrl";
import toast from "react-hot-toast";

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

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Login Successfully");
        return response.data.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/logout`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.status === 200) {
        toast.success("Logout Successfully");
        return response.data.message;
      }
    } catch (error) {
      console.error("Logout Error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/forgot-password`,
        payload
      );
      if (response.status === 200) {
        toast.success("Forgot Password Successfully");
        return response.data.message;
      }
    } catch (error) {
      toast.success(
        error.response?.data?.message || "Forgot password request failed"
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Forgot password request failed"
      );
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, payload, code }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/reset-password/${token}`,
        payload
      );
      if (response.status === 200) {
        toast.success("Forgot Password Successfully");
        return response.data.message;
      }
    } catch (error) {
      toast.success(
        error.response?.data?.message || "Forgot password request failed"
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Forgot password request failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/registerCompany",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/register-company`,
        payload
      );
      if (response.status === 200) {
        toast.success("Registration successful. Verify OTP...");
        return response.data.message;
      }
    } catch (error) {
      console.error("Registration Error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        if (error.response.data.data?.errors) {
          const errors = Object.values(error.response.data.data.errors);
          errorMessage = errors.join(", ");
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/verify-verification-code`,
        payload
      );
      if (response.status === 200) {
        toast.success("OTP Verified Successfully");
        return response.data.message;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const resendCode = createAsyncThunk(
  "auth/resendCode",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/resend-verification-code`,
        payload
      );
      if (response.status === 200) {
        toast.success("Verification code resent successfully");
        return response.data.message;
      }
    } catch (error) {
      let errorMessage = "Failed to resend verification code";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/me`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async ({ token, data }, thunkAPI) => {
    try {
      let response = await axios.put(
        `${BASE_URL}/api/user/update-account`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Account updated successfully");
        return response.data.data;
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed while updating your Account";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const { updateUserData } = authSlice.actions;
export default authSlice.reducer;
