import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("auth_token");
};

//! Authentication
export const login = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/login`,
      data: payload,
    });
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("auth_token", response.data.data.token);
      return {
        status: true,
        message: "Login Successfully",
        token: response.data.data.token,
      };
    }
  } catch (error) {
    console.log("Failed while trying to login account: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      } else {
        if (error.response.data.message) {
          return {
            status: false,
            message: error.response.data.message,
          };
        }
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

export const registration = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/register-company`,
      data: payload,
    });
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "Please wait",
      };
    }
  } catch (error) {
    console.log("Failed while trying to register your account: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      } else {
        if (error.response.data.message) {
          return {
            status: false,
            message: error.response.data.message,
          };
        }
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

export const verifyOTP = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/verify-verification-code`,
      data: payload,
    });
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "Verified Successfully",
      };
    }
  } catch (error) {
    console.log("Failed while trying to verify your account: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      } else {
        if (error.response.data.message) {
          return {
            status: false,
            message: error.response.data.message,
          };
        }
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

export const resendCode = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/resend-verification-code`,
      data: payload,
    });
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "Resend Successfully",
      };
    }
  } catch (error) {
    console.log("Failed while trying to resend code: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      } else {
        if (error.response.data.message) {
          return {
            status: false,
            message: error.response.data.message,
          };
        }
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

//! Credits...
export const getCredits = async () => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/booking-credit`,
      headers: {
        Authorization: getToken(),
      },
    });
    // console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        data: response.data.data.Balence,
      };
    }
  } catch (error) {
    console.log("Failed while getting credits: ", error);
  }
};

//! Flight...
export const searchFlight = async (payload) => {
  const apiUrlWithPayload = `${baseUrl}/api/search?trip_type=${
    payload.tripType
  }&departure_date_time=${payload.departureDate}&origin_location_code=${
    payload.originCode
  }&destination_location_code=${payload.destinationCode}&adult_quantity=${
    payload.adult
  }&child_quantity=${[payload.child]}&infant_quantity=${payload.infant}`;

  try {
    let response = await axios({
      method: "GET",
      url: apiUrlWithPayload,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      if (
        !response.data.data.PricedItineraries ||
        response.data.data.PricedItineraries.PricedItinerary.length === 0
      ) {
        return {
          status: false,
          message: ["No Flight Found!"],
        };
      } else {
        return {
          status: true,
          message: "Flighs Data Found",
          data: response.data.data,
        };
      }
    }
  } catch (error) {
    console.log("Failed while searching flight: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

//! Transactions...
export const createTransaction = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/company/create-transaction`,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "Transaction Created Successfully",
      };
    }
  } catch (error) {
    console.log("Failed while creating transaction: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      } else {
        return {
          status: false,
          message: "Failed while creating transaction",
        };
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

//! Users
export const createUser = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/user`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "New User Created",
      };
    }
  } catch (error) {
    console.log("Failed while creating user: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

export const getUsers = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseUrl}/api/user`,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      if (response.data.data.length > 0) {
        const extractedData = response.data.data.map(
          ({ id, first_name, last_name, email, mobile_number, role }) => ({
            id,
            first_name,
            last_name,
            email,
            mobile_number,
            role,
            status: "active",
          })
        );
        return { status: true, data: extractedData };
      }
    }
  } catch (error) {
    console.log("Failed while getting users: ", error);
  }
};

export const deleteUser = async (id) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${baseUrl}/api/user/${id}`,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      return { status: true, message: "User has been deleted" };
    }
  } catch (error) {
    console.log("Failed while deleting user: ", error);
    return { status: false, message: "Failed while deleting this user" };
  }
};

//! Tickets
export const createTicket = async (payload) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/ticket`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "New Ticket Created",
      };
    }
  } catch (error) {
    console.log("Failed while creating ticket: ", error);
    if (error.response) {
      if (error.response.data.data.errors) {
        const errors = Object.keys(error.response.data.data.errors);
        const errorMessages = [];

        for (let i = 0; i < errors.length; i++) {
          errorMessages.push(error.response.data.data.errors[errors[i]]);
        }
        return {
          status: false,
          message: errorMessages,
        };
      }
    } else {
      return {
        status: false,
        message: "Server Connection Error",
      };
    }
  }
};

export const getTickets = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseUrl}/api/ticket/company`,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      if (response.data.data.length > 0) {
        const extractedData = response.data.data.map(
          ({ id, title, description, status }) => ({
            id,
            title,
            description,
            status,
          })
        );
        return { status: true, data: extractedData };
      }
    }
  } catch (error) {
    console.log("Failed while getting tickets: ", error);
  }
};

export const deleteTicket = async (id) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${baseUrl}/api/ticket/${id}`,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      return { status: true, message: "Ticket has been deleted" };
    }
  } catch (error) {
    console.log("Failed while deleting ticket: ", error);
    return { status: false, message: "Failed while deleting this ticket" };
  }
};

//! Bookings
export const getFlightBookings = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseUrl}/api/booking`,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
    if (response.status === 200) {
      if (response.data.data.length > 0) {
        const extractedData = response.data.data.map(
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
            ticketing_time_limit,
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
            ticketing_time_limit,
            id,
            rate,
            persantage,
            canceled_at,
          })
        );
        return { status: true, data: extractedData };
      }
    }
  } catch (error) {
    console.log("Failed while getting bookings: ", error);
  }
};

export const cancelFlightBooking = async (payload) => {
  console.log(payload);

  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/request-cancel-booking`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
  } catch (error) {
    console.log("Failed while calling cancel booking api: ", error);
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
  console.log(payload);

  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/request-booking-refund`,
      data: payload,
      headers: {
        Authorization: getToken(),
      },
    });
    console.log(response);
  } catch (error) {
    console.log("Failed while calling refund booking api: ", error);
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
      url: `${baseUrl}/api/booking`,
      data: payload,
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
    });
    console.log("confirm booking response: ", response);
    if (response.status === 200) {
      return {
        status: true,
        message: "Booking Created",
      };
    }
  } catch (error) {
    console.log("Failed while calling confirming booking: ", error);
  }
};

//! Booking Active Routes
export const getRoutes = async () => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseUrl}/api/booking-all-active-routes`,
      headers: {
        Authorization: getToken(),
      },
    });
    // console.log(response);
    if (response.status === 200) {
      const data = response.data.data.Routes;
      return {
        status: true,
        data: data,
      };
    }
  } catch (error) {
    console.log("Failed while getting routes: ", error);
  }
};
