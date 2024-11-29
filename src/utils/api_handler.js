import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImNvbXBhbnlfaWQiOjIxLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MzI3NTI2MzIsImV4cCI6MTczMjgzOTAzMn0.NsnXguMuW7IXEsoQTHrCZ5HQqIsQTfPR6a0eEmo4aDU";

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


