import actions from '../BookingInquiry/actions';

const initialStates = {
    bookingInqListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    bookingInqCreated: {},
    bookingInqUpdate: {},
    bookingInqDelete: {},
    dropDownList: {},
    followUpList: {},
    followUpAdd: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Room Plan List */
        case actions.BOOKINGINQ_LIST:
            return { ...state, loader: true };
        case actions.BOOKINGINQ_LIST_SUCCESS:
            return {
                ...state,
                bookingInqListData: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_LIST_FAILURE:
            return { ...state, bookingInqListData: [], loader: false };
        /**Add Room Plan */
        case actions.BOOKINGINQ_ADD:
            return { ...state, loader: true };
        case actions.BOOKINGINQ_ADD_SUCCESS:
            return {
                ...state,
                bookingInqCreated: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_ADD_FAILURE:
            return { ...state, bookingInqUpdate: {}, loader: false };
        /**Update Room Plan */
        case actions.BOOKINGINQ_UPDATE:
            return { ...state, loader: true };
        case actions.BOOKINGINQ_UPDATE_SUCCESS:
            return {
                ...state,
                bookingInqUpdate: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_UPDATE_FAILURE:
            return { ...state, bookingInqUpdate: {}, loader: false };

        /**Delete Room Plan */
        case actions.BOOKINGINQ_DELETE:
            return { ...state, loader: true };
        case actions.BOOKINGINQ_DELETE_SUCCESS:
            return {
                ...state,
                bookingInqDelete: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_DELETE_FAILURE:
            return { ...state, bookingInqDelete: {}, loader: false };

        /**Room Plan List */
        case actions.BOOKINGINQ_DROPDOWN_LIST:
            return { ...state, loader: false };
        case actions.BOOKINGINQ_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                dropDownList: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_DROPDOWN_LIST_FAILURE:
            return { ...state, dropDownList: [], loader: false };
        /**Add Follow Up */
        case actions.BOOKINGINQ_FOLLOWUP_ADD:
            return { ...state, loader: false };
        case actions.BOOKINGINQ_FOLLOWUP_ADD_SUCCESS:
            return {
                ...state,
                followUpAdd: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_FOLLOWUP_ADD_FAILURE:
            return { ...state, followUpAdd: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
