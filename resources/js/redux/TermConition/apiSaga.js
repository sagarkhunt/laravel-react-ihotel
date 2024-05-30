import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../TermConition/actions';
import { postRequest } from '../../config/axiosClient'; // Assuming postRequest is used for all API requests
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for toast notifications

/**
 * Fetches the list of businesses.
 * @param {tncList} action The action containing payload for fetching business list.
 */
function* tncList(action) {
    try {
        const response = yield call(postRequest, 'get_tnc', action.payload);
        if (response) {
            yield put({
                type: actions.TNC_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.TNC_LIST_FAILURE });
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
 * @param {tncCreate} action The action containing payload for creating a new business.
 */
function* tncCreate(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_tnc', payload);
        if (response) {
            yield put({
                type: actions.TNC_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.TNC_ADD_FAILURE });
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
 * Updates a new tnc.
 * @param {tncUpdate} action The action containing payload for updating a new tnc.
 */
function* tncUpdate(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_tnc', payload);
        if (response) {
            yield put({
                type: actions.TNC_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.TNC_UPDATE_FAILURE });
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
 * Deletes a new tnc.
 * @param {tncDelete} action The action containing payload for deleting a new tnc.
 */
function* tncDelete(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_tnc', payload);
        if (response) {
            yield put({
                type: actions.TNC_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.TNC_DELETE_SUCCESS });
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
        takeLatest(actions.TNC_LIST, tncList),
        takeLatest(actions.TNC_ADD, tncCreate),
        takeLatest(actions.TNC_UPDATE, tncUpdate),
        takeLatest(actions.TNC_DELETE, tncDelete),
    ]);
}

export { tncList, tncCreate, tncUpdate, tncDelete };
