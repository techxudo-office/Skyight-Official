import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import makeRequest from "./ApiHelper";


const initialState = {
  travelers: [],
  isLoadingTravelers: false,

  bookingRoutes: [],
  isLoadingRoutes: false,

  allFormData: null,
  prevTraveller: null,
  disableTravelers: null,

  pnrData: null,
  isLoadingPNR: false,

  banks: [],
  isLoadingBanks: false,

  credits: null,
  isLoadingCredits: false,

  flightBookings: [],
  isLoadingFlightBookings: false,

  bookingDetails: null,
  isLoadingBookingDetails: false,

  isIssueLoading: false,

  searchResults: [],
  isLoadingSearchResults: false,

  routes: [],
  loadingRoutes: false,

  isBookingLoading: false,
  bookingMessage: null,

  isRefundLoading: false,
  refundMessage: null,

  isPenaltyLoading: false,
  penalties: null,

  searchForm: null,

  isCancelling: false,
  cancelSuccess: null,

  orders: [],
  isLoadingOrders: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSearchForm: (state, action) => {
      state.searchForm = action.payload;
    },
    setBookingStates: (state, action) => {
      state.allFormData = action.payload.formData;
      state.prevTraveller = action.payload.traveller;
      state.disableTravelers = action.payload.disabled;
    },
    emptyBookingStates: (state, action) => {
      state.allFormData = null;
      state.prevTraveller = null;
      state.disableTravelers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTravelers.pending, (state) => {
        state.isLoadingTravelers = true;
      })
      .addCase(getTravelers.fulfilled, (state, action) => {
        state.isLoadingTravelers = false;
        state.travelers = action.payload;
      })
      .addCase(getTravelers.rejected, (state, action) => {
        state.isLoadingTravelers = false;
      })

      .addCase(getBookingRoutes.pending, (state) => {
        state.isLoadingRoutes = true;
      })
      .addCase(getBookingRoutes.fulfilled, (state, action) => {
        state.isLoadingRoutes = false;
        state.bookingRoutes = action.payload;
      })
      .addCase(getBookingRoutes.rejected, (state, action) => {
        state.isLoadingRoutes = false;
      })
      .addCase(getPNR.pending, (state) => {
        state.isLoadingPNR = true;
      })
      .addCase(getPNR.fulfilled, (state, action) => {
        state.isLoadingPNR = false;
        state.pnrData = action.payload;
      })
      .addCase(getPNR.rejected, (state, action) => {
        state.isLoadingPNR = false;
      })
      .addCase(getBanks.pending, (state) => {
        state.isLoadingBanks = true;
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.isLoadingBanks = false;
        state.banks = action.payload;
      })
      .addCase(getBanks.rejected, (state, action) => {
        state.isLoadingBanks = false;
      })
      .addCase(getCredits.pending, (state) => {
        state.isLoadingCredits = true;
      })
      .addCase(getCredits.fulfilled, (state, action) => {
        state.isLoadingCredits = false;
        state.credits = action.payload;
      })
      .addCase(getCredits.rejected, (state, action) => {
        state.isLoadingCredits = false;
      })
      .addCase(getFlightBookings.pending, (state) => {
        state.isLoadingFlightBookings = true;
      })
      .addCase(getFlightBookings.fulfilled, (state, action) => {
        state.isLoadingFlightBookings = false;
        state.flightBookings = action.payload;
      })
      .addCase(getFlightBookings.rejected, (state, action) => {
        state.isLoadingFlightBookings = false;
      })
      .addCase(getBookingDetails.pending, (state) => {
        state.isLoadingBookingDetails = true;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.isLoadingBookingDetails = false;
        state.bookingDetails = action.payload;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.isLoadingBookingDetails = false;
      })
      .addCase(issueBooking.pending, (state) => {
        state.isIssueLoading = true;
      })
      .addCase(issueBooking.fulfilled, (state, action) => {
        state.isIssueLoading = false;
      })
      .addCase(issueBooking.rejected, (state, action) => {
        state.isIssueLoading = false;
      })
      .addCase(searchFlight.pending, (state) => {
        state.isLoadingSearchResults = true;
      })
      .addCase(searchFlight.fulfilled, (state, action) => {
        state.isLoadingSearchResults = false;
        state.searchResults = action.payload;
      })
      .addCase(searchFlight.rejected, (state, action) => {
        state.isLoadingSearchResults = false;
      })
      .addCase(getRoutes.pending, (state) => {
        state.loadingRoutes = true;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.loadingRoutes = false;
        state.routes = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.loadingRoutes = false;
      })
      .addCase(confirmBooking.pending, (state) => {
        state.isBookingLoading = true;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.isBookingLoading = false;
        state.bookingMessage = action.payload.message;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isBookingLoading = false;
      })
      .addCase(requestRefund.pending, (state) => {
        state.isRefundLoading = true;
      })
      .addCase(requestRefund.fulfilled, (state, action) => {
        state.isRefundLoading = false;
        state.refundMessage = action.payload.message;
      })
      .addCase(requestRefund.rejected, (state, action) => {
        state.isRefundLoading = false;
      })
      .addCase(getPenalty.pending, (state) => {
        state.isPenaltyLoading = true;
      })
      .addCase(getPenalty.fulfilled, (state, action) => {
        state.isPenaltyLoading = false;
        state.penalties = action.payload;
      })
      .addCase(getPenalty.rejected, (state, action) => {
        state.isPenaltyLoading = false;
      })
      .addCase(cancelFlightBooking.pending, (state) => {
        state.isCancelling = true;
        state.cancelSuccess = null;
      })
      .addCase(cancelFlightBooking.fulfilled, (state, action) => {
        state.isCancelling = false;
        state.cancelSuccess = action.payload.message;
      })
      .addCase(cancelFlightBooking.rejected, (state, action) => {
        state.isCancelling = false;
        state.cancelSuccess = null;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoadingOrders = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoadingOrders = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;
      });
  },
});

// Get Travelers
export const getTravelers = createAsyncThunk(
  "booking/getTravelers",
  ({ passengerType, token }) =>
    makeRequest('get', `/api/getTravellers?passenger_type=${passengerType}`, {
      token,
      errorMessage: "Failed to fetch travelers"
    })
);

// Get Booking Routes
export const getBookingRoutes = createAsyncThunk(
  "booking/getBookingRoutes",
  (token) => makeRequest('post', '/api/booking-all-active-routes', {
    token,
    errorMessage: "Failed to fetch booking routes"
  }).then(response => response.Routes || [])
);

// Get PNR
export const getPNR = createAsyncThunk(
  "booking/getPNR",
  ({ id, token }) => makeRequest('post', '/api/booking-pnr', {
    data: { pnr: id },
    token,
    successMessage: "PNR fetched successfully!",
    errorMessage: "Failed to fetch PNR"
  })
);

// Get Banks
export const getBanks = createAsyncThunk(
  "booking/getBanks",
  (token) => makeRequest('get', '/api/bank', {
    token,
    errorMessage: "Failed to fetch banks"
  }).then(response => {
    if (response[0]?.length > 0) {
      return response[0].map(({ id, bank }) => ({ value: id, label: bank }));
    }
    throw new Error("No Banks Found");
  })
);

// Get Credits
export const getCredits = createAsyncThunk(
  "booking/getCredits",
  (token) => makeRequest('get', '/api/booking-credits', {
    token,
    errorMessage: "Failed to fetch credits"
  })
);

// Get Flight Bookings
export const getFlightBookings = createAsyncThunk(
  "booking/getFlightBookings",
  ({ id, token }) =>
    makeRequest('get', `/api/booking/company/${id}`, {
      token,
      errorMessage: "Failed to fetch flight bookings"
    })
      .then(response => {
        let responseData = response;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }
        if (responseData.length === 0) {
          throw new Error("No bookings found");
        }
        return responseData
      })
);

// Get Booking Details
export const getBookingDetails = createAsyncThunk(
  "booking/getBookingDetails",
  ({ id, token }) =>
    makeRequest('get', `/api/booking/${id}`, {
      token,
      errorMessage: "Failed to fetch booking details"
    })
);

// Issue Booking
export const issueBooking = createAsyncThunk(
  "booking/issueBooking",
  ({ pnr, token }) =>
    makeRequest('post', '/api/booking-issue', {
      data: { pnr },
      token,
      errorMessage: "Failed to issue booking"
    }).then(response => {
      if (!response?.data?.Success) {
        toast.error("Your ticket has expired");
      }
      return response.data;
    })
);

// Search Flight
export const searchFlight = createAsyncThunk(
  "booking/searchFlight",
  ({ payload, token }) => {
    const requestBody = {
      trip_type: payload.tripType,
      origin_destinations: [{
        departure_date_time: payload.departureDate,
        origin_location_code: payload.originCode,
        destination_location_code: payload.destinationCode,
      }],
      adult_quantity: payload.adult,
      child_quantity: payload.child,
      infant_quantity: payload.infant,
    };

    if (payload.tripType === "Return" && payload.returnDate) {
      requestBody.origin_destinations.push({
        departure_date_time: payload.returnDate,
        origin_location_code: payload.destinationCode,
        destination_location_code: payload.originCode,
      });
    }

    return makeRequest('post', '/api/search', {
      data: requestBody,
      token,
      errorMessage: "No Flight Found!"
    }).then(response => {
      if (!response || response.length === 0 ||
        !response.PricedItineraries?.PricedItinerary?.length) {
        throw new Error("No Flight Found!");
      }
      return response;
    });
  }
);

// Get Routes
export const getRoutes = createAsyncThunk(
  "flight/getRoutes",
  (token) => makeRequest('post', '/api/booking-all-active-routes', {
    token,
    errorMessage: "Failed to fetch routes"
  }).then(response => response.Routes || [])
);

// Confirm Booking
export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  ({ data, token }) => makeRequest('post', '/api/booking', {
    data,
    token,
    successMessage: "Booking created successfully",
    errorMessage: "Failed to confirm booking"
  }).then(() => ({ status: true, message: "Booking Created" }))
);

// Request Refund
export const requestRefund = createAsyncThunk(
  "booking/requestRefund",
  ({ data, token }) => makeRequest('post', '/api/request-ticket-refund', {
    data,
    token,
    successMessage: "Requested refund successfully",
    errorMessage: "Failed to request refund"
  }).then(() => ({ status: true, message: "Refund Requested" }))
);
// export const requestRefund = createAsyncThunk(
//   "booking/requestRefund",
//   ({ data, token }) => makeRequest('post', '/api/request-booking-refund', {
//     data,
//     token,
//     successMessage: "Requested refund successfully",
//     errorMessage: "Failed to request refund"
//   }).then(() => ({ status: true, message: "Refund Requested" }))
// );

// Get Penalty
export const getPenalty = createAsyncThunk(
  "booking/getPenalty",
  ({ data, token }) => makeRequest('post', '/api/getPenalty', {
    data,
    token,
    errorMessage: "Failed to get penalty information"
  })
);

// Cancel Flight Booking
export const cancelFlightBooking = createAsyncThunk(
  "booking/cancelFlightBooking",
  ({ data, token }) =>
    makeRequest('post', '/api/request-cancel-booking', {
      data,
      token,
      successMessage: "Booking cancelled successfully",
      errorMessage: "Failed to cancel booking"
    })
);

// Get Orders
export const getOrders = createAsyncThunk(
  "booking/getOrders",
  (token) =>
    makeRequest('get', '/api/orders/company', {
      token,
      errorMessage: "Failed to fetch orders"
    })
);

export const { setSearchForm, setBookingStates, emptyBookingStates } =
  bookingSlice.actions;
export default bookingSlice.reducer;
