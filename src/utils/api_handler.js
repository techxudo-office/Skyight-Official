import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImNvbXBhbnlfaWQiOjIxLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MzMyNzAxNDAsImV4cCI6MTczMzM1NjU0MH0.VXraf7wcffRmlwA6IX68lYIoHai8CNLuzsu1o6CyBMM";

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
