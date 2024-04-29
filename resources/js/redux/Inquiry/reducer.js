import actions from '../Inquiry/actions';

const initialStates = {
    inquiryListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    inquiryCreated: {},
    inquiryUpdate: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Room Plan List */
        case actions.INQUIRY_LIST:
            return { ...state, loader: true };
        case actions.INQUIRY_LIST_SUCCESS:
            return {
                ...state,
                inquiryListData: action.payload,
                loader: false,
            };
        case actions.INQUIRY_LIST_FAILURE:
            return { ...state, inquiryListData: [], loader: false };
        /**Add Room Plan */
        case actions.INQUIRY_ADD:
            return { ...state, loader: true };
        case actions.INQUIRY_ADD_SUCCESS:
            return {
                ...state,
                inquiryCreated: action.payload,
                loader: false,
            };
        /**Update Room Plan */
        case actions.INQUIRY_UPDATE:
            return { ...state, loader: true };
        case actions.INQUIRY_UPDATE_SUCCESS:
            console.log(action.playload);
            return {
                ...state,
                inquiryUpdate: action.payload,
                loader: false,
            };
        case actions.INQUIRY_UPDATE_FAILURE:
            return { ...state, inquiryUpdate: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
