import { all, call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Section/actions';

import {
    postRequest,
    getRequest,
    deleteRequest,
    axiosApi,
} from '../../config/axiosClient';
import { message } from 'antd';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
/**
 *
 * @param {sectionList} action
 */
function* sectionList(action) {
    try {
        const response = yield call(postRequest, 'get_section', action.payload);
        if (response) {
            yield put({
                type: actions.SECTION_LIST_SUCCESS,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({ type: actions.SECTION_LIST_FAILURE });
        if (error.response.status === 401) {
            toast.error(error.response.data.message);
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error.response.data.message);
            // message.error(error.response.data.message);
        }
    }
}
/**
 *
 * @param {createSection} action
 */
function* createSection(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'create_section', payload);
        if (response) {
            yield put({
                type: actions.SECTION_ADD_SUCCESS,
                payload: response.data,
            });
            toast.success(response.message);
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.SECTION_ADD_FAILURE });

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
 * @param {updateSection} action
 */
function* updateSection(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'update_section', payload);
        if (response) {
            yield put({
                type: actions.SECTION_UPDATE_SUCCESS,
                payload: response.data,
            });
            if (response?.data == 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.SECTION_UPDATE_FAILURE });

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
 * @param {deleteSection} action
 */
function* deleteSection(action) {
    const { payload } = action;
    try {
        const response = yield call(postRequest, 'delete_section', payload);
        if (response) {
            yield put({
                type: actions.SECTION_DELETE_SUCCESS,
                payload: response.data,
            });
            if (response?.data == 'fail') {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        }
    } catch (error) {
        // Dispatch the register failure action
        yield put({ type: actions.SECTION_DELETE_FAILURE });

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
        takeLatest(actions.SECTION_LIST, sectionList),
        takeLatest(actions.SECTION_ADD, createSection),
        takeLatest(actions.SECTION_UPDATE, updateSection),
        takeLatest(actions.SECTION_DELETE, deleteSection),
    ]);
}
