import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.REACT_APP_URL;

export const axiosApi = axios.create({
    baseURL: baseURL,
});

// Add Authorization header with token from local storage
axiosApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('Access_Token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle errors and redirections
axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            // Unauthorized access
            localStorage.removeItem('access');

            window.location.href = '/login';
        } else if (response && response.status === 422) {
            toast.error(response.data?.message || 'An error occurred');
        } else if (response) {
            toast.error(response.data?.message || 'An error occurred');
        } else {
            toast.error('Network error or server is not reachable');
        }
        return Promise.reject(error);
    },
);

export const getRequest = async (url, config = {}) => {
    try {
        const response = await axiosApi.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postRequest = async (url, payload, config = {}) => {
    try {
        const response = await axiosApi.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchRequest = async (url, payload) => {
    try {
        const response = await axiosApi.patch(url, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRequest = async (url) => {
    try {
        const response = await axiosApi.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
