import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "./ApiHelper";

const initialState = {
  transactions: [],
  isLoadingTransactions: false,

  isCreatingTransaction: false,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isCreatingTransaction = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isCreatingTransaction = false;
        state.transactions = [action.payload, ...state.transactions];
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isCreatingTransaction = false;
      })
      .addCase(getTransactions.pending, (state) => {
        state.isLoadingTransactions = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoadingTransactions = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoadingTransactions = false;
      });
  },
});

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  ({ data, token }) =>
    makeRequest('post', '/api/company/create-transaction', {
      data,
      token,
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      },
      successMessage: "Transaction created successfully!",
      errorMessage: "Failed to create transaction"
    })
);

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  ({ token, page = 0, limit = 10000000 }) =>
    makeRequest('get', `/api/company/user-transactions?page=${page}&limit=${limit}`, {
      token,
      errorMessage: "Failed to fetch transactions"
    }).then(response => response[0])
);

export default transactionSlice.reducer;
