import axios from 'axios';
// import { BASE_URL } from './App';
export const BASE_URL = "http://localhost:4000";
const api = axios.create({
    baseURL: `${BASE_URL}/auth/`,
    // withCredentials: true,
});

export const googleAuth = (code) => {
    // Ensure the code is passed correctly
    return api.get(`/google?code=${code}`).catch((error) => {
        console.error("Error during Google Authentication request:", error);
        throw error;  // Propagate error for handling in component
    });
};