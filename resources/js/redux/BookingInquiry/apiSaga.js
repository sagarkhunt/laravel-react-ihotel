import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../BookingInquiry/actions';

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
 * @param {bookingInqList} action
 */
function* bookingInqList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_booking_inq',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.BOOKINGINQ_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.BOOKINGINQ_LIST_FAILURE });
        if (error.response.status === 401) {
            toast.error(error.response.data.message);
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error.response.data.message);
            // message.error(error.response.data.message);
        }
    }
}
/**
 *
 * @param {createBookingInq} action
 */
function* createBookingInq(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_booking_inq', payload);
        if (response) {
            yield put({
                type: actions.BOOKINGINQ_ADD_SUCCESS,
                payload: response.data,
            });
            if (response?.success === false) {
                const errors = response.data.errors;
                toast.error(Object.values(errors).join(', '));
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.BOOKINGINQ_ADD_FAILURE });

        // Handle different error statuses
        if (error.response?.status === false) {
            const errors = error.response.data.errors;
            toast.error(Object.values(errors).join(', '));
        } else if (error.response?.status === 400) {
            toast.error('Bad request');
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
 * @param {updateBookingInq} action
 */
function* updateBookingInq(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_booking_inq', payload);

        if (response) {
            yield put({
                type: actions.BOOKINGINQ_UPDATE_SUCCESS,
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
        yield put({ type: actions.BOOKINGINQ_UPDATE_FAILURE });

        // Handle different error statuses
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            toast.error(Object.values(errors).join(', '));
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
 * @param {followUpBookingInq} action
 */
function* followUpBookingInq(action) {
    const { payload } = action;
    try {
        const response = yield call(
            postRequest,
            'follow_up_booking_inq',
            payload,
        );
        if (response) {
            yield put({
                type: actions.BOOKINGINQ_FOLLOWUP_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.BOOKINGINQ_FOLLOWUP_ADD_FAILURE });

        // Handle different error statuses
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            toast.error(Object.values(errors).join(', '));
        } else if (error.response?.status === 400) {
            toast.error('Bad request');
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
 * @param {deleteBookingInq} action
 */
function* deleteBookingInq(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'delete_booking_inq', payload);

        if (response) {
            yield put({
                type: actions.BOOKINGINQ_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response?.data == 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response?.message);
            }
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.BOOKINGINQ_DELETE_FAILURE });

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
                type: actions.BOOKINGINQ_DROPDOWN_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.BOOKINGINQ_DROPDOWN_LIST_FAILURE });
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
        takeLatest(actions.BOOKINGINQ_LIST, bookingInqList),
        takeLatest(actions.BOOKINGINQ_ADD, createBookingInq),
        takeLatest(actions.BOOKINGINQ_UPDATE, updateBookingInq),
        takeLatest(actions.BOOKINGINQ_DELETE, deleteBookingInq),
        takeLatest(actions.BOOKINGINQ_DROPDOWN_LIST, dropownList),
        takeLatest(actions.BOOKINGINQ_FOLLOWUP_ADD, followUpBookingInq),
    ]);
}
