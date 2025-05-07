import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "./ApiHelper";


const initialState = {
    isSearchHistoryLoading: false,
    SearchHistory: []
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSearchHistory.pending, (state) => {
                state.isSearchHistoryLoading = true;
            })
            .addCase(getSearchHistory.fulfilled, (state, action) => {
                state.isSearchHistoryLoading = false;
                state.SearchHistory = action.payload;
            })
            .addCase(getSearchHistory.rejected, (state, action) => {
                state.isSearchHistoryLoading = false;
            });
    }
});


export const getSearchHistory = createAsyncThunk(
    "history/SearchHistory",
    (token) =>
        makeRequest('get', '/api/searchhistory', {
            token,
            errorMessage: "Failed to fetch search history"
        })
);

export default historySlice.reducer;
