import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { postRequest } from '../../../config/axiosClient';
import toast from 'react-hot-toast';

/**
 * Fetches the list of states.
 * @param {stateList} action The action containing payload for fetching state list.
 */
function* stateList(action) {
    try {
        const response = yield call(postRequest, 'get_state', action.payload);
        if (response) {
            yield put({
                type: actions.STATE_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.STATE_LIST_FAILURE });
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
 * Creates a new state.
 * @param {createState} action The action containing payload for creating a new state.
 */
function* createState(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_state', payload);
        if (response) {
            yield put({
                type: actions.STATE_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.STATE_ADD_FAILURE });
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
 * Updates a state.
 * @param {updateState} action The action containing payload for updating a state.
 */
function* updateState(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_state', payload);
        if (response) {
            yield put({
                type: actions.STATE_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.STATE_UPDATE_FAILURE });
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
 * Deletes a state.
 * @param {deleteState} action The action containing payload for deleting a state.
 */
function* deleteState(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_state', payload);
        if (response) {
            yield put({
                type: actions.STATE_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.STATE_DELETE_FAILURE });
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
                type: actions.STATE_DROPDOWN_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.STATE_DROPDOWN_LIST_FAILURE });
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

export default function* stateSaga() {
    yield all([
        takeLatest(actions.STATE_LIST, stateList),
        takeLatest(actions.STATE_ADD, createState),
        takeLatest(actions.STATE_UPDATE, updateState),
        takeLatest(actions.STATE_DELETE, deleteState),
        takeLatest(actions.STATE_DROPDOWN_LIST, dropownList),
    ]);
}

export { stateList, createState, updateState, deleteState };
