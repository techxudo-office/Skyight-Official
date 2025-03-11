import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiBaseUrl";
import toast from "react-hot-toast";

const initialState = {
  travelers: [],
  isLoadingTravelers: false,
  travelersError: null,

  pnrData: null,
  isLoadingPNR: false,
  pnrError: null,

  banks: [],
  isLoadingBanks: false,
  banksError: null,

  credits: null,
  isLoadingCredits: false,
  creditsError: null,

  flightBookings: [],
  isLoadingFlightBookings: false,
  flightBookingsError: null,

  bookingDetails: null,
  isLoadingBookingDetails: false,
  bookingDetailsError: null,

  isIssuingBooking: false,
  issueBookingError: null,

  searchResults: [],
  isLoadingSearchResults: false,
  searchResultsError: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTravelers.pending, (state) => {
        state.isLoadingTravelers = true;
        state.travelersError = null;
      })
      .addCase(getTravelers.fulfilled, (state, action) => {
        state.isLoadingTravelers = false;
        state.travelers = action.payload;
      })
      .addCase(getTravelers.rejected, (state, action) => {
        state.isLoadingTravelers = false;
        state.travelersError = action.payload;
      })
      .addCase(getPNR.pending, (state) => {
        state.isLoadingPNR = true;
        state.pnrError = null;
      })
      .addCase(getPNR.fulfilled, (state, action) => {
        state.isLoadingPNR = false;
        state.pnrData = action.payload;
      })
      .addCase(getPNR.rejected, (state, action) => {
        state.isLoadingPNR = false;
        state.pnrError = action.payload;
      })
      .addCase(getBanks.pending, (state) => {
        state.isLoadingBanks = true;
        state.banksError = null;
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.isLoadingBanks = false;
        state.banks = action.payload;
      })
      .addCase(getBanks.rejected, (state, action) => {
        state.isLoadingBanks = false;
        state.banksError = action.payload;
      })
      .addCase(getCredits.pending, (state) => {
        state.isLoadingCredits = true;
        state.creditsError = null;
      })
      .addCase(getCredits.fulfilled, (state, action) => {
        state.isLoadingCredits = false;
        state.credits = action.payload;
      })
      .addCase(getCredits.rejected, (state, action) => {
        state.isLoadingCredits = false;
        state.creditsError = action.payload;
      })
      .addCase(getFlightBookings.pending, (state) => {
        state.isLoadingFlightBookings = true;
        state.flightBookingsError = null;
      })
      .addCase(getFlightBookings.fulfilled, (state, action) => {
        state.isLoadingFlightBookings = false;
        state.flightBookings = action.payload;
      })
      .addCase(getFlightBookings.rejected, (state, action) => {
        state.isLoadingFlightBookings = false;
        state.flightBookingsError = action.payload;
      })
      .addCase(getBookingDetails.pending, (state) => {
        state.isLoadingBookingDetails = true;
        state.bookingDetailsError = null;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.isLoadingBookingDetails = false;
        state.bookingDetails = action.payload;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.isLoadingBookingDetails = false;
        state.bookingDetailsError = action.payload;
      })
      .addCase(issueBooking.pending, (state) => {
        state.isIssuingBooking = true;
        state.issueBookingError = null;
      })
      .addCase(issueBooking.fulfilled, (state, action) => {
        state.isIssuingBooking = false;
      })
      .addCase(issueBooking.rejected, (state, action) => {
        state.isIssuingBooking = false;
        state.issueBookingError = action.payload;
      })
      .addCase(searchFlight.pending, (state) => {
        state.isLoadingSearchResults = true;
        state.searchResultsError = null;
      })
      .addCase(searchFlight.fulfilled, (state, action) => {
        state.isLoadingSearchResults = false;
        state.searchResults = action.payload;
      })
      .addCase(searchFlight.rejected, (state, action) => {
        state.isLoadingSearchResults = false;
        state.searchResultsError = action.payload;
      });
  },
});

export const getTravelers = createAsyncThunk(
  "booking/getTravelers",
  async ({ passengerType, token }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/getTravellers?passenger_type=${passengerType}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error("Failed to fetch travelers");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch travelers";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getPNR = createAsyncThunk(
  "booking/getPNR",
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/booking-pnr`,
        { pnr: id },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("PNR fetched successfully!");
        return response.data.data;
      } else {
        const errorMessages = Object.values(response.data.data.errors).join(
          ", "
        );
        throw new Error(errorMessages);
      }
    } catch (error) {
      const errorMessage =
        Object.values(error?.response?.data?.data?.errors || {}).join(", ") ||
        "Failed to fetch PNR";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getBanks = createAsyncThunk(
  "booking/getBanks",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/bank`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.data[0]?.length > 0) {
        const extractedData = response.data.data[0].map(({ id, bank }) => ({
          value: id,
          label: bank,
        }));
        return extractedData;
      } else {
        throw new Error("No Banks Found");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch banks";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getCredits = createAsyncThunk(
  "booking/getCredits",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/booking-credits`, {
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

export const getFlightBookings = createAsyncThunk(
  "booking/getFlightBookings",
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/booking/company/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        let responseData = response.data.data;
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }

        if (responseData.length > 0) {
          const extractedData = responseData.map(
            ({
              origin,
              destination,
              booking_reference_id,
              total_fare,
              currency,
              booking_status,
              created_at,
              actions,
              updated_at,
              transaction_identifier,
              Timelimit,
              id,
              rate,
              persantage,
              canceled_at,
            }) => ({
              origin,
              destination,
              booking_reference_id,
              total_fare,
              currency,
              booking_status,
              created_at,
              actions,
              updated_at,
              transaction_identifier,
              Timelimit,
              id,
              rate,
              persantage,
              canceled_at,
            })
          );
          return extractedData;
        } else {
          throw new Error("No bookings found.");
        }
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch flight bookings.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getBookingDetails = createAsyncThunk(
  "booking/getBookingDetails",
  async ({ id, token }, thunkAPI) => {
    try {
      console.log("getBookingDetails running");
      const response = await axios.get(`${BASE_URL}/api/booking/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log(response.data.data, "bookingDetails------->");
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch booking details";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const issueBooking = createAsyncThunk(
  "booking/issueBooking",
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/booking-issue`,
        { pnr: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to issue booking");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to issue booking";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const searchFlight = createAsyncThunk(
  "booking/searchFlight",
  async ({ payload, token }, thunkAPI) => {
    try {
      const apiUrl = `${BASE_URL}/api/search`;

      const requestBody = {
        trip_type: payload.tripType,
        origin_destinations: [
          {
            departure_date_time: payload.departureDate,
            origin_location_code: payload.originCode,
            destination_location_code: payload.destinationCode,
          },
        ],
        adult_quantity: payload.adult,
        child_quantity: payload.child,
        infant_quantity: payload.infant,
      };

      // Handle round trip
      if (payload.tripType === "Return" && payload.returnDate) {
        requestBody.origin_destinations.push({
          departure_date_time: payload.returnDate,
          origin_location_code: payload.destinationCode,
          destination_location_code: payload.originCode,
        });
      }

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.status === 200) {
        if (!response.data.data || response.data.data.length === 0) {
          throw new Error("No Flight Found!");
        }
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to search Flights");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to search Flights";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export default bookingSlice.reducer;
