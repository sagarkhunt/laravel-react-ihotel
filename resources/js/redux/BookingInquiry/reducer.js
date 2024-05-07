import actions from '../BookingInquiry/actions';

const initialStates = {
    bookingInqListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    bookingInqCreated: {},
    bookingInqUpdate: {},
    dropDownList: {},
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
        /**Update Room Plan */
        case actions.BOOKINGINQ_UPDATE:
            return { ...state, loader: true };
        case actions.BOOKINGINQ_UPDATE_SUCCESS:
            console.log(action.playload);
            return {
                ...state,
                bookingInqUpdate: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_UPDATE_FAILURE:
            return { ...state, bookingInqUpdate: {}, loader: false };

        /**Room Plan List */
        case actions.BOOKINGINQ_DROPDOWN_LIST:
            return { ...state, loader: true };
        case actions.BOOKINGINQ_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                dropDownList: action.payload,
                loader: false,
            };
        case actions.BOOKINGINQ_DROPDOWN_LIST_FAILURE:
            return { ...state, dropDownList: [], loader: false };
        default:
            return state;
    }
}

export default Reducer;