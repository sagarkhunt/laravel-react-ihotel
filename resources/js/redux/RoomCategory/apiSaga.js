import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../RoomCategory/actions';

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
 * @param {roomCateList} action
 */
function* roomCateList(action) {
    try {
        console.log('asbakjsdnasjkbd');
        const response = yield call(
            postRequest,
            'get_room_cat   ',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.ROOMCATEGORY_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.ROOMCATEGORY_LIST_FAILURE });
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
 * @param {createRoomCate} action
 */
function* createRoomCate(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_room_cat', payload);
        if (response) {
            yield put({
                type: actions.ROOMCATEGORY_ADD_SUCCESS,
                payload: response.data,
            });
            message.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.ROOMCATEGORY_ADD_FAILURE });

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
 * @param {updateRoomCate} action
 */
function* updateRoomCate(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_room_cat', payload);

        if (response) {
            yield put({
                type: actions.ROOMCATEGORY_UPDATE_SUCCESS,
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
        yield put({ type: actions.ROOMCATEGORY_UPDATE_FAILURE });

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
        takeLatest(actions.ROOMCATEGORY_LIST, roomCateList),
        takeLatest(actions.ROOMCATEGORY_ADD, createRoomCate),
        takeLatest(actions.ROOMCATEGORY_UPDATE, updateRoomCate),
    ]);
}
