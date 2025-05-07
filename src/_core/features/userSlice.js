import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiBaseUrl";
import toast from "react-hot-toast";
import makeRequest from "./ApiHelper";

const initialState = {
  users: [],
  isLoadingUsers: false,
  usersError: null,

  isCreatingUser: false,
  createUserError: null,

  isDeletingUser: false,
  deleteUserError: null,

  isEditingUser: false,
  editUserError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoadingUsers = true;
        state.usersError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoadingUsers = false;
        state.users = action.payload[0];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoadingUsers = false;
        state.usersError = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.isCreatingUser = true;
        state.createUserError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreatingUser = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreatingUser = false;
        state.createUserError = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isDeletingUser = true;
        state.deleteUserError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeletingUser = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeletingUser = false;
        state.deleteUserError = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.isEditingUser = true;
        state.editUserError = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isEditingUser = false;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isEditingUser = false;
        state.editUserError = action.payload;
      });
  },
});

export const getUsers = createAsyncThunk(
  "user/getUsers",
  (token, { rejectWithValue }) =>
    makeRequest('get', '/api/user/company-user', {
      token,
      errorMessage: "Failed to fetch users"
    }).catch(rejectWithValue)
);

// Create User
export const createUser = createAsyncThunk(
  "user/createUser",
  ({ data, token }, { rejectWithValue }) =>
    makeRequest('post', '/api/user', {
      data,
      token,
      successMessage: "User created successfully",
      errorMessage: "Failed to create user"
    }).catch(rejectWithValue)
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  ({ id, token }, { rejectWithValue }) =>
    makeRequest('delete', `/api/user/${id}`, {
      token,
      successMessage: "User deleted successfully",
      errorMessage: "Failed while deleting this user"
    }).then(() => id).catch(rejectWithValue)
);

// Edit User
export const editUser = createAsyncThunk(
  "user/editUser",
  ({ id, token, data }, { rejectWithValue }) =>
    makeRequest('put', `/api/user/${id}`, {
      data,
      token,
      successMessage: "User updated successfully",
      errorMessage: "Failed while updating this User"
    }).catch(rejectWithValue)
);

// Upload User Image
export const uploadUserImage = createAsyncThunk(
  "user/uploadUserImage",
  ({ img, token }, { rejectWithValue }) =>
    makeRequest('post', '/api/user/image', {
      data: img,
      token,
      successMessage: "Image uploaded successfully",
      errorMessage: "Failed to upload image"
    }).catch(rejectWithValue)
);

export default userSlice.reducer;
