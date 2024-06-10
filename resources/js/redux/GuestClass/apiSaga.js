import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../GuestClass/actions';
import { postRequest } from '../../config/axiosClient'; // Assuming postRequest is used for all API requests
import { message } from 'antd'; // Assuming Ant Design's message component is used for notifications
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for toast notifications

/**
 * Fetches the list of businesses.
 * @param {guestList} action The action containing payload for fetching business list.
 */
function* guestList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_guest_cls',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.GUEST_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.GUEST_LIST_FAILURE });
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
 * @param {createGuest} action The action containing payload for creating a new business.
 */
function* createGuest(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_guest_cls', payload);
        if (response) {
            yield put({
                type: actions.GUEST_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.GUEST_ADD_FAILURE });
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
 * @param {updateGuest} action The action containing payload for updating a new business.
 */
function* updateGuest(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_guest_cls', payload);
        if (response) {
            yield put({
                type: actions.GUEST_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.GUEST_UPDATE_FAILURE });
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
 * Deletes a new guest.
 * @param {deleteGuest} action The action containing payload for deleting a new guest.
 */
function* deleteGuest(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_guest_cls', payload);
        if (response) {
            yield put({
                type: actions.GUEST_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.GUEST_DELETE_FAILURE });
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
        takeLatest(actions.GUEST_LIST, guestList),
        takeLatest(actions.GUEST_ADD, createGuest),
        takeLatest(actions.GUEST_UPDATE, updateGuest),
        takeLatest(actions.GUEST_DELETE, deleteGuest),
    ]);
}

export { guestList, createGuest, updateGuest, deleteGuest };
