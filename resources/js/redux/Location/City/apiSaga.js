import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { postRequest } from '../../config/axiosClient'; 
import toast from 'react-hot-toast';

/**
 * Fetches the list of cities.
 * @param {cityList} action The action containing payload for fetching city list.
 */
function* cityList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_city',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.CITY_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.CITY_LIST_FAILURE });
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
 * Creates a new city.
 * @param {createCity} action The action containing payload for creating a new city.
 */
function* createCity(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_city', payload);
        if (response) {
            yield put({
                type: actions.CITY_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.CITY_ADD_FAILURE });
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
 * Updates a city.
 * @param {updateCity} action The action containing payload for updating a city.
 */
function* updateCity(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_city', payload);
        if (response) {
            yield put({
                type: actions.CITY_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.CITY_UPDATE_FAILURE });
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
 * Deletes a city.
 * @param {deleteCity} action The action containing payload for deleting a city.
 */
function* deleteCity(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_city', payload);
        if (response) {
            yield put({
                type: actions.CITY_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.CITY_DELETE_FAILURE });
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

export default function* citySaga() {
    yield all([
        takeLatest(actions.CITY_LIST, cityList),
        takeLatest(actions.CITY_ADD, createCity),
        takeLatest(actions.CITY_UPDATE, updateCity),
        takeLatest(actions.CITY_DELETE, deleteCity),
    ]);
}

export { cityList, createCity, updateCity, deleteCity };
