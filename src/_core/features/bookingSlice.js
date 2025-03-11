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

export default bookingSlice.reducer;
