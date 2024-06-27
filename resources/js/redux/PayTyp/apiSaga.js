import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { postRequest } from '../../config/axiosClient';
import toast from 'react-hot-toast';

/**
 * Fetches the list of ID Types.
 * @param {payTypList} action The action containing payload for fetching ID Type list.
 */
function* payTypList(action) {
    try {
        const response = yield call(postRequest, 'get_rcpt', action.payload);
        if (response) {
            yield put({
                type: actions.PAY_TYP_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.PAY_TYP_LIST_FAILURE });
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
 * Creates a new ID Type.
 * @param {createPayTyp} action The action containing payload for creating a new ID Type.
 */
function* createPayTyp(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_rcpt', payload);
        if (response) {
            yield put({
                type: actions.PAY_TYP_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.PAY_TYP_ADD_FAILURE });
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
 * Updates a new ID Type.
 * @param {updatePayTyp} action The action containing payload for updating a new ID Type.
 */
function* updatePayTyp(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_rcpt', payload);
        if (response) {
            yield put({
                type: actions.PAY_TYP_UPD_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.PAY_TYP_UPD_FAILURE });
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
 * Deletes a new ID Type.
 * @param {deletePayTyp} action The action containing payload for deleting a new ID Type.
 */
function* deletePayTyp(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_rcpt', payload);
        if (response) {
            yield put({
                type: actions.PAY_TYP_DEL_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.PAY_TYP_DEL_FAILURE });
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
        takeLatest(actions.PAY_TYP_LIST, payTypList),
        takeLatest(actions.PAY_TYP_ADD, createPayTyp),
        takeLatest(actions.PAY_TYP_UPD, updatePayTyp),
        takeLatest(actions.PAY_TYP_DEL, deletePayTyp),
    ]);
}

export { payTypList, createPayTyp, updatePayTyp, deletePayTyp };
