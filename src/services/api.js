import axios from 'axios';
import { BACKEND_URL } from "./helper";

let url = BACKEND_URL;

export const registerUser = async (data) => {
    try {
        return await axios.post(`${url}/user/register`, data);
    } catch (error) {
        console.log(error);
        console.log(`Error while calling register User api ${error.response.data}`);
    }
}

export const sendOtpFunction = async (data) => {
    console.log(data);
    try {
        return await axios.post(`${url}/user/sendotp`, data);
    } catch (error) {
        console.log(
          `Error while calling send otp api ${error.response.data}`
        );
    }
}

export const userVerify = async (data) => {
    try {
        return await axios.post(`${url}/user/login`, data);
    } catch (error) {
        console.log(`Error while calling user verify api ${error.response.data}`);
    }
}