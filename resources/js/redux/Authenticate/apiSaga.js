import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Authenticate/actions';
import {
    postRequest,
    // getCustomRequest,
    getRequest,
    deleteRequest,
    axiosApi,
} from '../../config/axiosClient';
import { message } from 'antd';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

function* login(action) {
    try {
        const response = yield call(postRequest, 'login', action.payload);
        if (response) {
            localStorage.setItem('Access_Token', response?.data?.token);
            Cookies.set('token', response?.data?.token, { expires: 365 });
            localStorage.setItem('isAuthenticated', true);
            axiosApi.defaults.headers.common['Authorization'] =
                `Bearer ${response?.data?.token}`;
            // Add any further processing of the token
            yield put({ type: actions.LOGIN_SUCCESS, payload: response.data });
        }
    } catch (error) {
        yield put({ type: actions.LOGIN_FAILURE });
        if (error.response.status === 401) {
            message.error(error.response.data.message);
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error.response.data.message);
            message.error(error.response.data.message);
        }
    }
}

function* register(action) {
    const { payload } = action;

    try {
        const response = yield call(postRequest, 'register', payload);
        if (response) {
            yield put({
                type: actions.REGISTER_SUCCESS,
                payload: response.data,
            });
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
        return;
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
        //  window.location.href = '/login';
        yield call(() => deleteRequest('logout'));
        yield put({ type: actions.LOGOUT_SUCCESS });
    } catch (e) {
        yield put({ type: actions.LOGOUT_FAILURE });
    }
}

function* verifyToken(action) {
    try {
        const response = yield call(
            postRequest,
            'verify_token',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.VERIFYTOKEN_SUCCESS,
                payload: response,
            });
        }
    } catch (error) {
        yield put({ type: actions.VERIFYTOKEN_FAILURE });
        if (error.response.status === 401) {
            message.error(error.response.data.message);
        } else {
            message.error('Something Went Wrong');
        }
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(actions.LOGIN, login),
        takeLatest(actions.GET_AUTH_USER, getAuthUser),
        takeLatest(actions.LOGOUT, logout),
        takeLatest(actions.REGISTER, register),
        takeLatest(actions.VERIFYTOKEN, verifyToken),
    ]);
}
