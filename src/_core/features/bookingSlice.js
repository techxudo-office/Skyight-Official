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
      });
  },
});

export const getTravelers = createAsyncThunk(
  "traveler/getTravelers",
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
        // toast.success("Travelers fetched successfully!");
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
  "traveler/getPNR",
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

export default bookingSlice.reducer;
