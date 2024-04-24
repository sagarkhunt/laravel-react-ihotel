import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export const axiosApi = axios.create({
    baseURL: import.meta.env.REACT_APP_URL,
});
if (typeof window !== 'undefined') {
    axiosApi.defaults.headers.common['Authorization'] =
        `Bearer ${localStorage.getItem('access')}`;
    axiosApi.defaults.headers['Access-Control-Allow-Origin'] = '*';
    axiosApi.defaults.headers['ngrok-skip-browser-warning'] = 'any';
}

axiosApi.interceptors.request.use(
    (config) => {
        // trigger 'loading=true' event here
        return config;
    },
    (error) => {
        // trigger 'loading=false' event here
        return Promise.reject(error);
    },
);
// axiosApi.interceptors.response.use(
//     (response) => {
//         if (response?.data?.message) {
//             toast.success(response?.data?.message);
//         }
//         return response;
//     },
//     (error) => {
//         console.log("🚀 ~ error:", error)
        
//         // if (axiosApi.isCancel()) {
//         //   return false;
//         // }
//         const _status = error.response.status;
       
//         switch (_status) {
//             case 401:
                
//                 toast.error('You are not authorized !');
//                 // 1. redirect to login
//                 Cookies.remove('token');
//                 typeof window !== 'undefined' && localStorage.clear();
//                 window.location.href = '/login';
//                 // localStorage.getItem("access");
//                 return;
//             case 500:
//                 toast.error('Internal server Error !');
//                 break;
//             default:
//                 toast.error(error.response?.data?.message);
//         }
//         return Promise.reject(error);
//     },
// );

export async function getCustomRequest(URL) {
    return await axiosApi.get(`/${URL}`).then((response) => response);
}

export async function getRequest(URL) {
    return await axiosApi.get(`/${URL}`).then((response) => response);
}
// export async function postRequest(URL, payload) {
//     console.log(axiosApi);
//     return await axiosApi
//         .post(`/${URL}`, payload)
//         .then((response) => response.data);
// }
/** set post response */
export async function postRequest(URL, payload, config = {}) {
    return await axiosApi
      .post(URL, { ...payload }, { ...config })
      .then((response) =>  response.data);
  }

export async function patchRequest(URL, payload) {
    return await axiosApi
        .patch(`/${URL}`, payload)
        .then((response) => response); 
}

export async function deleteRequest(URL) {
    return await axiosApi.delete(`/${URL}`).then((response) => response);
}
