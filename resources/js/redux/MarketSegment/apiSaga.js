import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { postRequest } from '../../config/axiosClient';
import toast from 'react-hot-toast';

/**
 * Fetches the list of market segments.
 * @param {marketSegmentList} action The action containing payload for fetching market segment list.
 */
function* marketSegmentList(action) {
    try {
        const response = yield call(
            postRequest,
            'get_mkrt_sgmt',
            action.payload,
        );
        if (response) {
            yield put({
                type: actions.MARKETSEGMENT_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.MARKETSEGMENT_LIST_FAILURE });
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
 * Creates a new market segment.
 * @param {createMarketSegment} action The action containing payload for creating a new market segment.
 */
function* createMarketSegment(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'cr_mkrt_sgmt', payload);
        if (response) {
            yield put({
                type: actions.MARKETSEGMENT_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        yield put({ type: actions.MARKETSEGMENT_ADD_FAILURE });
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
 * Updates a market segment.
 * @param {updateMarketSegment} action The action containing payload for updating a market segment.
 */
function* updateMarketSegment(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'upd_mkrt_sgmt', payload);
        if (response) {
            yield put({
                type: actions.MARKETSEGMENT_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.MARKETSEGMENT_UPDATE_FAILURE });
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
 * Deletes a market segment.
 * @param {deleteMarketSegment} action The action containing payload for deleting a market segment.
 */
function* deleteMarketSegment(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'del_mkrt_sgmt', payload);
        if (response) {
            yield put({
                type: actions.MARKETSEGMENT_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response.data === 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        yield put({ type: actions.MARKETSEGMENT_DELETE_FAILURE });
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
        takeLatest(actions.MARKETSEGMENT_LIST, marketSegmentList),
        takeLatest(actions.MARKETSEGMENT_ADD, createMarketSegment),
        takeLatest(actions.MARKETSEGMENT_UPDATE, updateMarketSegment),
        takeLatest(actions.MARKETSEGMENT_DELETE, deleteMarketSegment),
    ]);
}

export {
    marketSegmentList,
    createMarketSegment,
    updateMarketSegment,
    deleteMarketSegment,
};
