import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Users/actions';

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

function* userList(action) {
    try {
        const response = yield call(postRequest, 'get_users', action.payload);
        if (response) {
            yield put({
                type: actions.USER_LIST_SUCCESS,
                payload: response.data,
            });
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
/**
 * Add user
 */
function* createUser(action) {
    const { payload } = action;
    // const { navigate } = payload; // Extract navigate from payload
    try {
        const response = yield call(postRequest, 'create_user', payload);
        if (response) {
            yield put({
                type: actions.USER_ADD_SUCCESS,
                payload: response.data,
            });
            message.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.USER_ADD_FAILURE });

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

/**
 * Upate User
 */
function* updateUser(action) {
    const { payload } = action;
    // const { navigate } = payload; // Extract navigate from payload
    try {
        const response = yield call(postRequest, 'update_user', payload);
        if (response) {
            yield put({
                type: actions.USER_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response?.data == 'fail') {
                message.error(response.message);
            } else {
                message.success(response.message);
            }
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.USER_UPDATE_FAILURE });

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

export default function* rootSaga() {
    yield all([
        takeLatest(actions.USER_LIST, userList),
        takeLatest(actions.USER_ADD, createUser),
        takeLatest(actions.USER_UPDATE, updateUser),
    ]);
}
