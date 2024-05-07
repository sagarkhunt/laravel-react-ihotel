import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../RoomView/actions';

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
 * @param {roomViewList} action
 */
function* roomViewList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_room_view',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.ROOMVIEW_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.ROOMVIEW_LIST_FAILURE });
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
 * @param {createRoomView} action
 */
function* createRoomView(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_room_view', payload);
        if (response) {
            yield put({
                type: actions.ROOMVIEW_ADD_SUCCESS,
                payload: response.data,
            });
            message.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.ROOMVIEW_ADD_FAILURE });

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
 * @param {updateRoomView} action
 */
function* updateRoomView(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_room_view', payload);
        if (response) {
            yield put({
                type: actions.ROOMVIEW_UPDATE_SUCCESS,
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
        yield put({ type: actions.ROOMVIEW_UPDATE_FAILURE });

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
        takeLatest(actions.ROOMVIEW_LIST, roomViewList),
        takeLatest(actions.ROOMVIEW_ADD, createRoomView),
        takeLatest(actions.ROOMVIEW_UPDATE, updateRoomView),
    ]);
}
