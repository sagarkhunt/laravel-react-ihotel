import actions from '../BookingSource/actions';

const initialStates = {
    bookingListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    bookingCreated: {},
    bookingUpdate: {},
    bookingDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.BOOKING_LIST:
            return { ...state, loader: true };
        case actions.BOOKING_LIST_SUCCESS:
            return {
                ...state,
                bookingListData: action.payload,
                loader: false,
            };
        case actions.BOOKING_LIST_FAILURE:
            return { ...state, bookingListData: [], loader: false };
        /**Add Section */
        case actions.BOOKING_ADD:
            return { ...state, loader: true };
        case actions.BOOKING_ADD_SUCCESS:
            return {
                ...state,
                bookingCreated: action.payload,
                loader: false,
            };
        /**Update Business */
        case actions.BOOKING_UPDATE:
            return { ...state, loader: true };
        case actions.BOOKING_UPDATE_SUCCESS:
            return {
                ...state,
                bookingUpdate: action.payload,
                loader: false,
            };
        case actions.BOOKING_UPDATE_FAILURE:
            return { ...state, bookingUpdate: {}, loader: false };
        /**Delete Business */
        case actions.BOOKING_DELETE:
            return { ...state, loader: true };
        case actions.BOOKING_DELETE_SUCCESS:
            return {
                ...state,
                bookingDelete: action.payload,
                loader: false,
            };
        case actions.BOOKING_DELETE_FAILURE:
            return { ...state, bookingDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
