import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { postRequest } from '../../config/axiosClient';
import toast from 'react-hot-toast';

/**
 *
 * COUNTRY API SAGA
 */

/**
 * Fetches the list of countries.
 * @param {countryList} action The action containing payload for fetching country list.
 */
function* countryList(action) {
    try {
        const response = yield call(postRequest, 'get_country', action.payload);
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
                type: actions.DROPDOWN_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.DROPDOWN_LIST_FAILURE });
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

/**
 *
 * STATE API SAGA
 */

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
 * CITY API SAGA
 */

/**
 * Fetches the list of cities.
 * @param {cityList} action The action containing payload for fetching city list.
 */
function* cityList(action) {
    try {
        const response = yield call(postRequest, 'get_city', action.payload);
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

export default function* countrySaga() {
    yield all([
        takeLatest(actions.COUNTRY_LIST, countryList),
        takeLatest(actions.COUNTRY_ADD, createCountry),
        takeLatest(actions.COUNTRY_UPDATE, updateCountry),
        takeLatest(actions.COUNTRY_DELETE, deleteCountry),
        takeLatest(actions.DROPDOWN_LIST, dropownList),

        takeLatest(actions.STATE_LIST, stateList),
        takeLatest(actions.STATE_ADD, createState),
        takeLatest(actions.STATE_UPDATE, updateState),
        takeLatest(actions.STATE_DELETE, deleteState),

        takeLatest(actions.CITY_LIST, cityList),
        takeLatest(actions.CITY_ADD, createCity),
        takeLatest(actions.CITY_UPDATE, updateCity),
        takeLatest(actions.CITY_DELETE, deleteCity),
    ]);
}

export {
    countryList,
    createCountry,
    updateCountry,
    deleteCountry,
    dropownList,
    stateList,
    createState,
    updateState,
    deleteState,
    cityList,
    createCity,
    updateCity,
    deleteCity,
};
