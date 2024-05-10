import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.REACT_APP_URL;

export const axiosApi = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true, // Include cookies in cross-origin requests
});
// Fetch CSRF token from meta tag in HTML document
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

// Set CSRF token in default headers for all Axios requests
axiosApi.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

// Add Authorization header with token from local storage
// axiosApi.interceptors.request.use((config) => {
//     const token = localStorage.getItem('Access_Token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
axiosApi.interceptors.request.use(
    (config) => {
        const isAuthenticated = JSON.parse(
            localStorage.getItem('isAuthenticated'),
        );
        if (isAuthenticated) {
            const token = localStorage.getItem('Access_Token');
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Handle errors and redirections
axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('🚀 ~ error:', error);
        const { response } = error;
        if (response && response.status === 401) {
            // Unauthorized access
            localStorage.removeItem('Access_Token');
            localStorage.removeItem('isAuthenticated');

            // window.location.href = '/login';
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
