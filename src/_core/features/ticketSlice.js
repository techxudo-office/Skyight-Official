import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "./ApiHelper";



const initialState = {
  tickets: [],
  isCreatingTicket: false,
  isLoadingTickets: false,
  isDeletingTicket: false,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isCreatingTicket = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isCreatingTicket = false;
        state.tickets = [action.payload, ...state.tickets];
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isCreatingTicket = false;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoadingTickets = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoadingTickets = false;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoadingTickets = false;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.isDeletingTicket = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.isDeletingTicket = false;
        state.tickets = state.tickets.filter(
          (ticket) => ticket.id !== action.payload
        );
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.isDeletingTicket = false;
      });
  },
});

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  ({ data, token }) =>
    makeRequest('post', '/api/ticket', {
      data,
      token,
      successMessage: "New Ticket Created",
      errorMessage: "Failed to create ticket"
    })
);

export const getTickets = createAsyncThunk(
  "ticket/getTickets",
  (token) =>
    makeRequest('get', '/api/ticket/company', {
      token,
      errorMessage: "Failed to fetch tickets"
    })
);

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  ({ id, token }) =>
    makeRequest('delete', `/api/ticket?ticket_id=${id}`, {
      token,
      successMessage: "Ticket has been deleted",
      errorMessage: "Failed while deleting this ticket"
    }).then(() => id)
);

export default ticketSlice.reducer;