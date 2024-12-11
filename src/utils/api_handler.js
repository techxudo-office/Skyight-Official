import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsImNvbXBhbnlfaWQiOjQ2LCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MzM4NjI5NDUsImV4cCI6MTczMzk0OTM0NX0.12I0NAs4HCXJcmKoaZsqnH1Ok9Yqha5Qtn-2RTtpy9U";

export const getSetting = async () => {
    try {
        let response = await axios({
            method: 'GET',
            url: `${baseUrl}/api/setting`,
            headers: {
                Authorization: token
            }
        });
        console.log(response);
        if (response.status === 200) {
            const { id, commission, rate, from, status = 'active' } = response.data.data
            return { status: true, data: { id, commission, rate, from, status } };
        }
    } catch (error) {
        console.log('Failed while calling setting api: ', error);
    }
};

export const updateSetting = async (payload) => {
    try {
        let response = await axios({
            method: 'POST',
            url: `${baseUrl}/api/setting`,
            data: payload,
            headers: {
                Authorization: token
            }
        });
        console.log(response);
        if (response.status === 200) {
            return {
                status: true,
                message: 'Setting Updated Successfully'
            };
        };
    } catch (error) {
        console.log('Failed while updating settings: ', error);
        if (error.response) {
            const commissionErr = error.response.data.data.errors.commission;
            const rateErr = error.response.data.data.errors.rate;
            if (commissionErr) {
                return {
                    status: false,
                    message: commissionErr
                };
            }
            if (rateErr) {
                return {
                    status: false,
                    message: rateErr
                };
            };
        }
        else {
            return {
                status: false,
                message: 'Server Connection Error'
            };
        };
    };
};

export const searchFlight = async (payload) => {

    const apiUrlWithPayload = `${baseUrl}/api/search?trip_type=${payload.tripType}&departure_date_time=${payload.departureDate}&origin_location_code=${payload.originCode}&destination_location_code=${payload.destinationCode}&adult_quantity=${payload.adult}&child_quantity=${[payload.child]}&infant_quantity=${payload.infant}`;

    try {
        let response = await axios({
            method: 'GET',
            url: apiUrlWithPayload,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        });
        console.log(response);
        if (response.status === 200) {
            if (!response.data.data.PricedItineraries || response.data.data.PricedItineraries.PricedItinerary.length === 0) {
                return {
                    status: false,
                    message: ['No Flight Found!']
                };
            }
            else {
                return {
                    status: true,
                    message: 'Flighs Data Found',
                    data: response.data.data
                }
            }
        };
    } catch (error) {
        console.log('Failed while searching flight: ', error);
        if (error.response) {
            if (error.response.data.data.errors) {
                const errors = Object.keys(error.response.data.data.errors);
                const errorMessages = [];

                for (let i = 0; i < errors.length; i++) {
                    errorMessages.push(error.response.data.data.errors[errors[i]]);
                }
                return {
                    status: false,
                    message: errorMessages
                };
            }
        }
        else {
            return {
                status: false,
                message: 'Server Connection Error'
            };
        };
    };
};

//! Transactions...
export const createTransaction = async (payload) => {
    try {
        let response = await axios({
            method: 'POST',
            url: `${baseUrl}/api/company/create-transaction`,
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            }
        });
        console.log(response);
        if (response.status === 200) {
            return {
                status: true,
                message: 'Transaction Created Successfully',
            }
        };
    } catch (error) {
        console.log('Failed while creating transaction: ', error);
        if (error.response) {
            if (error.response.data.data.errors) {
                const errors = Object.keys(error.response.data.data.errors);
                const errorMessages = [];

                for (let i = 0; i < errors.length; i++) {
                    errorMessages.push(error.response.data.data.errors[errors[i]]);
                }
                return {
                    status: false,
                    message: errorMessages
                };
            }
            else {
                return {
                    status: false,
                    message: 'Failed while creating transaction'
                }
            }
        }
        else {
            return {
                status: false,
                message: 'Server Connection Error'
            };
        };
    };
};

//! Users
export const createUser = async (payload) => {
    try {
        let response = await axios({
            method: "POST",
            url: `${baseUrl}/api/user`,
            data: payload,
            headers: {
                Authorization: token,
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
                Authorization: token,
            },
        });
        console.log(response);
        if (response.status === 200) {
            if (response.data.data.length > 0) {
                const extractedData = response.data.data.map(
                    ({ id, first_name, last_name, email, mobile_number, role }) => ({
                        id, first_name, last_name, email, mobile_number, role, status: "active"
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
                Authorization: token,
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
                Authorization: token,
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
                Authorization: token,
            },
        });
        console.log(response);
        if (response.status === 200) {
            if (response.data.data.length > 0) {
                const extractedData = response.data.data.map(
                    ({ id, title, description, status }) => ({
                        id, title, description, status
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
                Authorization: token,
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
                Authorization: token,
            },
        });
        console.log(response);
        if (response.status === 200) {
            if (response.data.data.length > 0) {
                const extractedData = response.data.data.map(
                    ({ origin, destination, booking_reference_id, total_fare, currency, booking_status, created_at, actions, updated_at, transaction_identifier, ticketing_time_limit, id, rate, persantage, canceled_at }) => ({
                        origin, destination, booking_reference_id, total_fare, currency, booking_status, created_at, actions, updated_at, transaction_identifier, ticketing_time_limit, id, rate, persantage, canceled_at
                    })
                );
                return { status: true, data: extractedData };
            }
        }
    } catch (error) {
        console.log("Failed while getting bookings: ", error);
    }
};

export const cancelFlightBooking = () => { };