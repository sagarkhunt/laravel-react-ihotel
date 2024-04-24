import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Authenticate/actions';
import {
    postRequest,
    getCustomRequest,
    getRequest,
    deleteRequest,
    axiosApi,
} from '../../config/axiosClient';
import { message } from 'antd';
import Cookies from "js-cookie";

// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function* login(action) {
    try {
        // yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        // const response = yield call(() => postRequest('login', action.payload));
        const response = yield call(postRequest, 'login', action.payload);
        if (response) {
            
            localStorage.setItem("access", response?.data?.token);
            // Cookies.set("token", response?.tokens?.access?.token);
            Cookies.set("token", response?.data?.token, { expires: 365 });
            localStorage.setItem("isAuthentication", true);
            axiosApi.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response?.data?.token}`;
            // Add any further processing of the token
            yield put({ type: actions.LOGIN_SUCCESS, payload: response.data });
        }
    } catch (error) {
        console.log('🚀 ~ function*login ~ error:', error);
        yield put({ type: actions.LOGIN_FAILURE });
        if (error.response.status === 401) {
            message.error(error.response.data.message);
        } else {
            message.error('Something Went Wrong');
        }
    }
}

function* register(action) {
    // const history = useHistory();
    console.log("🚀 ~ function*register ~ history:", history)
    try {        
        const response = yield call(postRequest, 'register', action.payload);
        if (response) {        
            localStorage.setItem("access", response?.data?.token);
            // Cookies.set("token", response?.tokens?.access?.token);
            Cookies.set("token", response?.data?.token, { expires: 365 });
            localStorage.setItem("isAuthentication", true);
            axiosApi.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response?.data?.token}`;    
            // Add any further processing of the token
            yield put({ type: actions.REGISTER_SUCCESS, payload: response.data });
        }
    } catch (error) {
          // Dispatch the register failure action
          yield put({ type: actions.REGISTER_FAILURE });

          // Handle different error statuses
          if (error.response?.status === 422) {
              const errors = error.response.data.errors;
              message.error(Object.values(errors).join(', '));
          } else if (error.response?.status === 400) {
              message.error('Bad request');
          } else if (error.response?.status === 401) {
              message.error('Unauthorized');
          } else if (error.response?.status === 500) {
              message.error('Internal server error');
          } else {
              message.error('Something went wrong');
          }
    }
}

function* getAuthUser() {
    try {
        const response = yield call(() => getRequest('auth/user'));
        
        yield put({
            type: actions.GET_AUTH_USER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        yield put({ type: actions.GET_AUTH_USER_FAILURE });
    }
}

function* logout() {
    try {
         // 1. redirect to login
         Cookies.remove('token');
         typeof window !== 'undefined' && localStorage.clear();
         window.location.href = '/login';
        yield call(() => deleteRequest('logout'));
        yield put({ type: actions.LOGOUT_SUCCESS });
    } catch (e) {
        yield put({ type: actions.LOGOUT_FAILURE });
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.LOGIN, login)]);
    yield all([takeLatest(actions.GET_AUTH_USER, getAuthUser)]);
    yield all([takeLatest(actions.LOGOUT, logout)]);
    yield all([takeLatest(actions.REGISTER, register)]);
}
