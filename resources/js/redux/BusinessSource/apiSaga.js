import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../BusinessSource/actions';
import { postRequest } from '../../config/axiosClient'; // Assuming postRequest is used for all API requests
import { message } from 'antd'; // Assuming Ant Design's message component is used for notifications
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for toast notifications

/**
 * Fetches the list of businesses.
 * @param {businessList} action The action containing payload for fetching business list.
 */
function* businessList(action) {
    try {
        const response = yield call(postRequest, 'get_bus_sou', action.payload);
        if (response) {
            yield put({
                type: actions.BUSINESS_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.BUSINESS_LIST_FAILURE });
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
 * @param {createBusiness} action The action containing payload for creating a new business.
 */
function* createBusiness(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_bus_sou', payload);
        if (response) {
            yield put({
                type: actions.BUSINESS_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.BUSINESS_ADD_FAILURE });
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
 * @param {updateBusiness} action The action containing payload for updating a new business.
 */
function* updateBusiness(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_bus_sou', payload);
        if (response) {
            yield put({
                type: actions.BUSINESS_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.BUSINESS_UPDATE_FAILURE });
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
 * @param {deleteBusiness} action The action containing payload for deleting a new business.
 */
function* deleteBusiness(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'delete_bus_sou', payload);
        if (response) {
            yield put({
                type: actions.BUSINESS_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.BUSINESS_DELETE_FAILURE });
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
        takeLatest(actions.BUSINESS_LIST, businessList),
        takeLatest(actions.BUSINESS_ADD, createBusiness),
        takeLatest(actions.BUSINESS_UPDATE, updateBusiness),
        takeLatest(actions.BUSINESS_DELETE, deleteBusiness),
    ]);
}

export { businessList, createBusiness, updateBusiness, deleteBusiness };
