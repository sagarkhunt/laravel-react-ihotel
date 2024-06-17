import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Reservation/actions';

import {
    postRequest,
    getRequest,
    deleteRequest,
    axiosApi,
} from '../../config/axiosClient';
import toast from 'react-hot-toast';
/**
 *
 * @param {reservationList} action
 */
function* reservationList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_reservation',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.RESER_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.RESER_LIST_FAILURE });
        if (error.response.status === 401) {
            toast.error(error.response.data.message);
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error.response.data.message);
        }
    }
}
/**
 *
 * @param {createReservation} action
 */
function* createReservation(action) {
    const { payload } = action;
    try {
        console.log(payload, '==========');
        const response = yield call(postRequest, 'create_reservation', payload);
        if (response) {
            yield put({
                type: actions.RESER_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.RESER_ADD_FAILURE });

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
 * @param {updateReservation} action
 */
function* updateReservation(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_reservation', payload);
        if (response) {
            yield put({
                type: actions.RESER_UPDATE_SUCCESS,
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
        yield put({ type: actions.RESER_UPDATE_FAILURE });

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
 * @param {deleteReservation} action
 */
function* deleteReservation(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'delete_reservation', payload);
        if (response) {
            yield put({
                type: actions.RESER_DELETE_SUCCESS,
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
        yield put({ type: actions.RESER_DELETE_FAILURE });

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
                type: actions.RESER_DROPDOWN_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.RESER_DROPDOWN_LIST_FAILURE });
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
        takeLatest(actions.RESER_LIST, reservationList),
        takeLatest(actions.RESER_ADD, createReservation),
        takeLatest(actions.RESER_UPDATE, updateReservation),
        takeLatest(actions.RESER_DELETE, deleteReservation),
        takeLatest(actions.RESER_DROPDOWN_LIST, dropownList)
    ]);
}
