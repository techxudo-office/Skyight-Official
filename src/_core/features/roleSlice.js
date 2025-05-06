import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiBaseUrl";
import toast from "react-hot-toast";
import makeRequest from "./ApiHelper";


const initialState = {
  roles: [],
  isLoadingRoles: false,
  isLoadingCreateRole: false,
  totalPages: 1,

  isDeletingRole: false,

  isEditingRole: false,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.isLoadingRoles = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoadingRoles = false;
        state.roles = action.payload.data.roles;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoadingRoles = false;
      })
      .addCase(createRole.pending, (state) => {
        state.isLoadingCreateRole = true;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.isLoadingCreateRole = false;
        state.roles = [action.payload, ...state.roles];
      })
      .addCase(createRole.rejected, (state, action) => {
        state.isLoadingCreateRole = false;
      })
      .addCase(deleteRole.pending, (state) => {
        state.isDeletingRole = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.isDeletingRole = false;
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.isDeletingRole = false;
      })
      .addCase(editRole.pending, (state) => {
        state.isEditingRole = true;
      })
      .addCase(editRole.fulfilled, (state, action) => {
        state.isEditingRole = false;
        const updatedRole = action.payload;
        if (!Array.isArray(state.roles)) {
          console.error("state.roles is not an array!", state.roles);
          return;
        }

        state.roles = state.roles.map((role) =>
          role.id == updatedRole.id ? { ...role, ...updatedRole } : role
        );
      })
      .addCase(editRole.rejected, (state, action) => {
        state.isEditingRole = false;
      });
  },
});

// Get Roles with Pagination
export const getRoles = createAsyncThunk(
  "role/getRoles",
  ({ token, page = 0, limit = 10000 }) =>
    makeRequest('get', `/api/role?page=${page}&limit=${limit}`, {
      token,
      errorMessage: "Failed to fetch roles"
    }).then(response => {

      return ({
        data: response,
        totalPages: response.totalPages || 1
      })
    })
);

// Create Role
export const createRole = createAsyncThunk(
  "role/createRole",
  ({ data, token }) => makeRequest('post', '/api/role', {
    data,
    token,
    successMessage: "Role created successfully",
    errorMessage: "Failed to create role"
  })
);

// Delete Role 
export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  ({ id, token }) => makeRequest('delete', `/api/role/${id}`, {
    token,
    successMessage: "Role deleted successfully",
    errorMessage: "Failed while deleting this role"
  }).then(() => id)
);

// Edit Role
export const editRole = createAsyncThunk(
  "role/editRole",
  ({ id, token, data }) => makeRequest('put', `/api/role/${id}`, {
    data,
    token,
    successMessage: "Role updated successfully",
    errorMessage: "Failed while updating this role"
  })
);

export default roleSlice.reducer;
