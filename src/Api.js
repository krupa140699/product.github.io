import axios from 'axios';
import { BASE_URL } from './App';

const api = axios.create({
    baseURL: `${BASE_URL}/auth/`,
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);