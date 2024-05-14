import actions from '../Inquiry/actions';

const initialStates = {
    inquiryListData: [],
    error: {},
    loader: false,
    logOutLoader: false,
    inquiryCreated: {},
    inquiryUpdate: {},
    inquiryDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Inquiry List */
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
        /**Add Inquiry */
        case actions.INQUIRY_ADD:
            return { ...state, loader: true };
        case actions.INQUIRY_ADD_SUCCESS:
            return {
                ...state,
                inquiryCreated: action.payload,
                loader: false,
            };
        /**Update Inquiry */
        case actions.INQUIRY_UPDATE:
            return { ...state, loader: true };
        case actions.INQUIRY_UPDATE_SUCCESS:
            return {
                ...state,
                inquiryUpdate: action.payload,
                loader: false,
            };
        case actions.INQUIRY_UPDATE_FAILURE:
            return { ...state, inquiryUpdate: {}, loader: false };
        /**Delete Inquiry */
        case actions.INQUIRY_DELETE:
            return { ...state, loader: true };
        case actions.INQUIRY_DELETE_SUCCESS:
            return {
                ...state,
                inquiryDelete: action.payload,
                loader: false,
            };
        case actions.INQUIRY_DELETE_FAILURE:
            return { ...state, inquiryDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
