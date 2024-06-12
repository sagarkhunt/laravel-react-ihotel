import { all, call, put, takeLatest } from 'redux-saga/effects';
import idTypeActions from './actions';
import { postRequest } from '../../config/axiosClient';
import toast from 'react-hot-toast';

/**
 * Fetches the list of ID Types.
 * @param {idTypeList} action The action containing payload for fetching ID Type list.
 */
function* idTypeList(action) {
    try {
        const response = yield call(postRequest, 'get_idtype', action.payload);
        if (response) {
            yield put({
                type: idTypeActions.ID_TYPE_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: idTypeActions.ID_TYPE_LIST_FAILURE });
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
 * @param {createIDType} action The action containing payload for creating a new ID Type.
 */
function* createIDType(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_idtype', payload);
        if (response) {
            yield put({
                type: idTypeActions.ID_TYPE_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: idTypeActions.ID_TYPE_ADD_FAILURE });
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
 * @param {updateIDType} action The action containing payload for updating a new ID Type.
 */
function* updateIDType(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_idtype', payload);
        if (response) {
            yield put({
                type: idTypeActions.ID_TYPE_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: idTypeActions.ID_TYPE_UPDATE_FAILURE });
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
 * @param {deleteIDType} action The action containing payload for deleting a new ID Type.
 */
function* deleteIDType(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_idtype', payload);
        if (response) {
            yield put({
                type: idTypeActions.ID_TYPE_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: idTypeActions.ID_TYPE_DELETE_FAILURE });
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
        takeLatest(idTypeActions.ID_TYPE_LIST, idTypeList),
        takeLatest(idTypeActions.ID_TYPE_ADD, createIDType),
        takeLatest(idTypeActions.ID_TYPE_UPDATE, updateIDType),
        takeLatest(idTypeActions.ID_TYPE_DELETE, deleteIDType),
    ]);
}

export { idTypeList, createIDType, updateIDType, deleteIDType };
