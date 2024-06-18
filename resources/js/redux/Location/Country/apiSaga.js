import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { postRequest } from '../../config/axiosClient'; 
import toast from 'react-hot-toast';

/**
 * Fetches the list of countries.
 * @param {countryList} action The action containing payload for fetching country list.
 */
function* countryList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_country',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.COUNTRY_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.COUNTRY_LIST_FAILURE });
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
 * Creates a new country.
 * @param {createCountry} action The action containing payload for creating a new country.
 */
function* createCountry(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_country', payload);
        if (response) {
            yield put({
                type: actions.COUNTRY_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.COUNTRY_ADD_FAILURE });
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
 * Updates a country.
 * @param {updateCountry} action The action containing payload for updating a country.
 */
function* updateCountry(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_country', payload);
        if (response) {
            yield put({
                type: actions.COUNTRY_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.COUNTRY_UPDATE_FAILURE });
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
 * Deletes a country.
 * @param {deleteCountry} action The action containing payload for deleting a country.
 */
function* deleteCountry(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_country', payload);
        if (response) {
            yield put({
                type: actions.COUNTRY_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.COUNTRY_DELETE_FAILURE });
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

export default function* countrySaga() {
    yield all([
        takeLatest(actions.COUNTRY_LIST, countryList),
        takeLatest(actions.COUNTRY_ADD, createCountry),
        takeLatest(actions.COUNTRY_UPDATE, updateCountry),
        takeLatest(actions.COUNTRY_DELETE, deleteCountry),
    ]);
}

export { countryList, createCountry, updateCountry, deleteCountry };
