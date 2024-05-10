import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Floor/actions';

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
 * @param {floorList} action
 */
function* floorList(action) {
    try {
        const response = yield call(postRequest, 'get_floors', action.payload);
        if (response) {
            yield put({
                type: actions.FLOOR_LIST_SUCCESS,
                payload: response.data,
            });
            if (response?.data == 'fail') {
                toast.error(response.message);
            } else {
                // toast.success(response?.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.FLOOR_LIST_FAILURE });
        if (error.response.status === 401) {
            // message.error(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error?.response?.data?.message);
            // message.error(error.response.data.message);
        }
    }
}
/**
 *
 * @param {createFloor} action
 */
function* createFloor(action) {
    const { payload } = action;
    // const { navigate } = payload; // Extract navigate from payload
    try {
        const response = yield call(postRequest, 'create_floor', payload);
        if (response) {
            yield put({
                type: actions.FLOOR_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.FLOOR_ADD_FAILURE });

        // Handle different error statuses
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            toast.error(Object.values(errors).join(', '));
        } else if (error.response?.status === 400) {
            toast.error('Bad request');
        } else if (error.response?.status === 401) {
            toast.error('Unauthorized');
        } else if (error.response?.status === 500) {
            toast.error('Internal server error');
        } else {
            toast.error('Something went wrong');
        }
    }
}

/**
 *
 * @param {updateFloor} action
 */
function* updateFloor(action) {
    const { payload } = action;
    // const { navigate } = payload; // Extract navigate from payload
    try {
        const response = yield call(postRequest, 'update_floor', payload);
        if (response) {
            yield put({
                type: actions.FLOOR_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response?.data == 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.FLOOR_UPDATE_FAILURE });

        // Handle different error statuses
        if (error.response?.status === 422) {
            const errors = error?.response?.data?.errors;
            toast.error(Object.values(errors).join(', '));
        } else if (error.response?.status === 400) {
            toast.error('Bad request');
        } else if (error.response?.status === 401) {
            toast.error('Unauthorized');
        } else if (error.response?.status === 500) {
            toast.error('Internal server error');
        } else {
            toast.error('Something went wrong');
        }
    }
}
/**
 *
 * @param {deleteFloor} action
 */
function* deleteFloor(action) {
    const { payload } = action;

    try {
        const response = yield call(postRequest, 'delete_floor', payload);
        if (response) {
            yield put({
                type: actions.FLOOR_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response?.data == 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.FLOOR_DELETE_FAILURE });

        // Handle different error statuses
        if (error.response?.status === 422) {
            const errors = error?.response?.data?.errors;
            toast.error(Object.values(errors).join(', '));
        } else if (error.response?.status === 400) {
            toast.error('Bad request');
        } else if (error.response?.status === 401) {
            toast.error('Unauthorized');
        } else if (error.response?.status === 500) {
            toast.error('Internal server error');
        } else {
            toast.error('Something went wrong');
        }
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(actions.FLOOR_LIST, floorList),
        takeLatest(actions.FLOOR_ADD, createFloor),
        takeLatest(actions.FLOOR_UPDATE, updateFloor),
        takeLatest(actions.FLOOR_DELETE, deleteFloor),
    ]);
}
