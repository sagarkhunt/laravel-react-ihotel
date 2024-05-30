import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../CancellPolicy/actions';
import { postRequest } from '../../config/axiosClient'; // Assuming postRequest is used for all API requests
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for toast notifications

/**
 * Fetches the list of cancellPolicy.
 * @param {cpList} action The action containing payload for fetching business list.
 */
function* cpList(action) {
    try {
        const response = yield call(postRequest, 'get_cp', action.payload);
        if (response) {
            yield put({
                type: actions.CP_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.CP_LIST_FAILURE });
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
 * Creates a new cancellPolicy.
 * @param {cpCreate} action The action containing payload for creating a new business.
 */
function* cpCreate(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_cp', payload);
        if (response) {
            yield put({
                type: actions.CP_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.CP_ADD_FAILURE });
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
 * Updates a new cpUpdate.
 * @param {cpUpdate} action The action containing payload for updating a new business.
 */
function* cpUpdate(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_cp', payload);
        if (response) {
            yield put({
                type: actions.CP_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.CP_UPDATE_FAILURE });
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
 * Deletes a new cpdelete.
 * @param {cpdelete} action The action containing payload for deleting a new cpdelete.
 */
function* cpdelete(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_cp', payload);
        if (response) {
            yield put({
                type: actions.CP_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.CP_DELETE_SUCCESS });
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
        takeLatest(actions.CP_LIST, cpList),
        takeLatest(actions.CP_ADD, cpCreate),
        takeLatest(actions.CP_UPDATE, cpUpdate),
        takeLatest(actions.CP_DELETE, cpdelete),
    ]);
}

export { cpList, cpCreate, cpUpdate, cpdelete };
