import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../BookingSource/actions';
import { postRequest } from '../../config/axiosClient'; // Assuming postRequest is used for all API requests
import { message } from 'antd'; // Assuming Ant Design's message component is used for notifications
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for toast notifications

/**
 * Fetches the list of businesses.
 * @param {bookingList} action The action containing payload for fetching business list.
 */
function* bookingList(action) {
    try {
        const response = yield call(postRequest, 'get_boo_sou', action.payload);
        if (response) {
            yield put({
                type: actions.BOOKING_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.BOOKING_LIST_FAILURE });
        // Handle different error statuses
        if (error.response?.status === 401) {
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
 * Creates a new business.
 * @param {createBooking} action The action containing payload for creating a new business.
 */
function* createBooking(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_boo_sou', payload);
        if (response) {
            yield put({
                type: actions.BOOKING_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.BOOKING_ADD_FAILURE });
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
 * Updates a new business.
 * @param {updateBooking} action The action containing payload for updating a new business.
 */
function* updateBooking(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_boo_sou', payload);
        if (response) {
            yield put({
                type: actions.BOOKING_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.BOOKING_UPDATE_FAILURE });
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
 * Deletes a new business.
 * @param {deleteBooking} action The action containing payload for deleting a new business.
 */
function* deleteBooking(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'delete_boo_sou', payload);
        if (response) {
            yield put({
                type: actions.BOOKING_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.BOOKING_DELETE_SUCCESS });
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

export default function* rootSaga() {
    yield all([
        takeLatest(actions.BOOKING_LIST, bookingList),
        takeLatest(actions.BOOKING_ADD, createBooking),
        takeLatest(actions.BOOKING_UPDATE, updateBooking),
        takeLatest(actions.BOOKING_DELETE, deleteBooking),
    ]);
}

export { bookingList, createBooking, updateBooking, deleteBooking };
