import axios from "axios";
import { BASE_URL } from "./ApiBaseUrl";

export const getToken = () => {
  return localStorage.getItem("auth_token");

};

//! Credits...
export const getCredits = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${BASE_URL}/api/booking-credits`,
      headers: {
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      return {
        status: true,
        data: response.data.data,
      };
    }
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};

//! Flight...
export const searchFlight = async (payload) => {
  const apiUrl = `${BASE_URL}/api/search`;

  // Constructing the required body dynamically
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

  // Handle Round Trip (if applicable)
  if (payload.tripType === "Return" && payload.returnDate) {
    requestBody.origin_destinations.push({
      departure_date_time: payload.returnDate,
      origin_location_code: payload.destinationCode,
      destination_location_code: payload.originCode,
    });
  }

  try {
    let response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      if (!response.data.data || response.data.data.length === 0) {
        return { status: false, message: ["No Flight Found!"] };
      } else {
        return {
          status: true,
          message: "Flights Data Found",
          data: response.data.data,
        };
      }
    }
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || "Failed to search Flights",
    };
  }
};

//! Bookings
export const getFlightBookings = async (id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${BASE_URL}/api/booking/company/${id}`,
      headers: {
        Authorization: getToken(),
      },
    });
    if (response.data.status === "success") {
      let responseData = response.data.data
      if (!Array.isArray(response.data.data)) {
        responseData = [response.data.data]
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
        return { status: true, data: extractedData };
      } else {
        return { status: false, message: "No bookings found." };
      }
    }
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message || "Failed to fetch flight bookings.",
    };
  }
};

export const issueBooking = async (id) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/booking-issue`,
      data: {
        pnr: id,
      },
      headers: {
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    } else {
      return { status: false, data: response.data };
    }
  } catch (error) {
  }
};
export const getBookingDetails = async (id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${BASE_URL}/api/booking/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      return { status: true, data: response.data.data };
    }
  } catch (error) {
  }
};

export const cancelFlightBooking = async (payload) => {

  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/request-cancel-booking`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });

    if (response.status === 200) {
      return { status: true, message: "Cancelled Requested" };
    }
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: "Failed while cancelling booking",
      };
    } else {
      return {
        status: false,
        message: "Server Connection Error!",
      };
    }
  }
};

export const refundRequest = async (payload) => {

  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/request-booking-refund`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });

    if (response.status === 200) {
      return { status: true, message: "Refund Requested" };
    }
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: "Failed while sending booking refund request",
      };
    } else {
      return {
        status: false,
        message: "Server Connection Error!",
      };
    }
  }
};

export const confirmBooking = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/booking`,
      data: payload,
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return {
        status: true,
        message: "Booking Created",
      };
    } else {
      return {
        status: false,
        message: response.message,
      };
    }
  } catch (error) {
    if (error.response.data.data.errors) {
      return {
        status: false,
        message: Object.values(error.response.data.data.errors),
      };
    } else {
      return {
        status: false,
        message: error.response.data.message,
      };
    }
  }
};

//! Booking Active Routes
export const getRoutes = async () => {
  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/booking-all-active-routes`,
      headers: {
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      return {
        status: true,
        data: response.data.data.Routes,
      };
    }
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while fetching routes.",
    };
  }
};

//! Banks
export const getBanks = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${BASE_URL}/api/bank`,
      headers: {
        Authorization: getToken(),
      },
    });

    if (response.status === 200) {
      if (response.data.data[0].length > 0) {
        const extractedData = response.data.data[0].map(({ id, bank }) => ({
          value: id,
          label: bank,
        }));
        return { status: true, data: extractedData };
      }
    }
  } catch (error) {
    return { status: false, data: "No Banks" };

  }
};

//! Travelers...
export const getTravelers = async (passengerType) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${BASE_URL}/api/getTravellers?passenger_type=${passengerType}`,
      headers: {
        Authorization: getToken(),
      },
    });
    if (response.status === 200) {
      return {
        status: true,
        data: response.data.data,
      };
    }
  } catch (error) {
  }
};

export const getPNR = async (id) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/booking-pnr`,
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",

      },
      data: {
        pnr: id
      }

    });
    if (response.status === 200) {

      return {
        status: true,
        data: response.data.data,
      };
    } else {
      return {
        status: false,
        data: Object.values(response.data.data.errors).map((value) => value),
      };
    }
  } catch (error) {
    return {
      status: false,
      data: Object.values(error.response.data.data.errors).map((value) => value),
    };
  }
};
