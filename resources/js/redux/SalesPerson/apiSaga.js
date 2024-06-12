import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { postRequest } from '../../config/axiosClient';
import toast from 'react-hot-toast';

/**
 * Fetches the list of salespersons.
 * @param {salesPersonList} action The action containing payload for fetching salesperson list.
 */
function* salesPersonList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_sls_prsn',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.SALESPERSON_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.SALESPERSON_LIST_FAILURE });
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
 * Creates a new salesperson.
 * @param {createSalesPerson} action The action containing payload for creating a new salesperson.
 */
function* createSalesPerson(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_sls_prsn', payload);
        if (response) {
            yield put({
                type: actions.SALESPERSON_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.SALESPERSON_ADD_FAILURE });
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
 * Updates a salesperson.
 * @param {updateSalesPerson} action The action containing payload for updating a salesperson.
 */
function* updateSalesPerson(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_sls_prsn', payload);
        if (response) {
            yield put({
                type: actions.SALESPERSON_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.SALESPERSON_UPDATE_FAILURE });
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
 * Deletes a salesperson.
 * @param {deleteSalesPerson} action The action containing payload for deleting a salesperson.
 */
function* deleteSalesPerson(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_sls_prsn', payload);
        if (response) {
            yield put({
                type: actions.SALESPERSON_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.SALESPERSON_DELETE_FAILURE });
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
        takeLatest(actions.SALESPERSON_LIST, salesPersonList),
        takeLatest(actions.SALESPERSON_ADD, createSalesPerson),
        takeLatest(actions.SALESPERSON_UPDATE, updateSalesPerson),
        takeLatest(actions.SALESPERSON_DELETE, deleteSalesPerson),
    ]);
}

export {
    salesPersonList,
    createSalesPerson,
    updateSalesPerson,
    deleteSalesPerson,
};
