import actions from './actions';

const initialStates = {
    payTypListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    payTypCreated: {},
    payTypUpdate: {},
    payTypDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /** ID Type List */
        case actions.PAY_TYP_LIST:
            return { ...state, loader: true };
        case actions.PAY_TYP_LIST_SUCCESS:
            return {
                ...state,
                payTypListData: action.payload,
                loader: false,
            };
        case actions.PAY_TYP_LIST_FAILURE:
            return { ...state, payTypListData: [], loader: false };
        /** Add ID Type */
        case actions.PAY_TYP_ADD:
            return { ...state, loader: true };
        case actions.PAY_TYP_ADD_SUCCESS:
            return {
                ...state,
                payTypCreated: action.payload,
                loader: false,
            };
        case actions.PAY_TYP_ADD_FAILURE:
            return { ...state, payTypCreated: {}, loader: false };
        /** Update ID Type */
        case actions.PAY_TYP_UPD:
            return { ...state, loader: true };
        case actions.PAY_TYP_UPD_SUCCESS:
            return {
                ...state,
                payTypUpdate: action.payload,
                loader: false,
            };
        case actions.PAY_TYP_UPD_FAILURE:
            return { ...state, payTypUpdate: {}, loader: false };
        /** Delete ID Type */
        case actions.PAY_TYP_DEL:
            return { ...state, loader: true };
        case actions.PAY_TYP_DEL_SUCCESS:
            return {
                ...state,
                payTypDelete: action.payload,
                loader: false,
            };
        case actions.PAY_TYP_DEL_FAILURE:
            return { ...state, payTypDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
