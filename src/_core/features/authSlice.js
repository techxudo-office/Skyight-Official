import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VITE_API_URL } from "../../utils/ApiBaseUrl";

const initialState = {
  userData: null,
  isLoading: false,
  error: null,
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
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${VITE_API_URL}/api/login`, payload, {
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
      if (error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data?.message || "Login failed"
        );
      } else {
        return thunkAPI.rejectWithValue("Server Connection Error");
      }
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
