import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Rooms/actions';

import {
    postRequest,
    getRequest,
    deleteRequest,
    axiosApi,
} from '../../config/axiosClient';
import { message } from 'antd';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
/**
 *
 * @param {roomsList} action
 */
function* roomsList(action) {
    try {
        const response = yield call(postRequest, 'get_room', action.payload);
        if (response) {
            yield put({
                type: actions.ROOMS_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.ROOMS_LIST_FAILURE });
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
 *
 * @param {createRooms} action
 */
function* createRooms(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_room', payload);
        if (response) {
            yield put({
                type: actions.ROOMS_ADD_SUCCESS,
                payload: response.data,
            });
            message.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.ROOMS_ADD_FAILURE });

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
 *
 * @param {updateRooms} action
 */
function* updateRooms(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_room', payload);

        if (response) {
            yield put({
                type: actions.ROOMS_UPDATE_SUCCESS,
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
        yield put({ type: actions.ROOMS_UPDATE_FAILURE });

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
 *
 * @param {addMultipleRooms} action
 */
function* addMultipleRooms(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_multi_room', payload);

        if (response) {
            yield put({
                type: actions.ROOMS_MULTIPLE_ADD_SUCCESS,
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
        yield put({ type: actions.ROOMS_MULTIPLE_ADD_FAILURE });

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
 *
 * @param {dropownList} action
 */
function* dropownList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_login_sync',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.ROOMS_DROPDOWN_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.ROOMS_DROPDOWN_LIST_FAILURE });
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

export default function* rootSaga() {
    yield all([
        takeLatest(actions.ROOMS_LIST, roomsList),
        takeLatest(actions.ROOMS_ADD, createRooms),
        takeLatest(actions.ROOMS_UPDATE, updateRooms),
        takeLatest(actions.ROOMS_MULTIPLE_ADD, addMultipleRooms),
        takeLatest(actions.ROOMS_DROPDOWN_LIST, dropownList),
    ]);
}
