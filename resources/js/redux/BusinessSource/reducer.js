import actions from '../BusinessSource/actions';

const initialStates = {
    businessListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    businessCreated: {},
    businessUpdate: {},
    businessDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Business List */
        case actions.BUSINESS_LIST:
            return { ...state, loader: true };
        case actions.BUSINESS_LIST_SUCCESS:
            return {
                ...state,
                businessListData: action.payload,
                loader: false,
            };
        case actions.BUSINESS_LIST_FAILURE:
            return { ...state, businessListData: [], loader: false };
        /**Add Business */
        case actions.BUSINESS_ADD:
            return { ...state, loader: true };
        case actions.BUSINESS_ADD_SUCCESS:
            return {
                ...state,
                businessCreated: action.payload,
                loader: false,
            };
        /**Update Business */
        case actions.BUSINESS_UPDATE:
            return { ...state, loader: true };
        case actions.BUSINESS_UPDATE_SUCCESS:
            return {
                ...state,
                businessUpdate: action.payload,
                loader: false,
            };
        case actions.BUSINESS_UPDATE_FAILURE:
            return { ...state, businessUpdate: {}, loader: false };
        /**Delete Business */
        case actions.BUSINESS_DELETE:
            return { ...state, loader: true };
        case actions.BUSINESS_DELETE_SUCCESS:
            return {
                ...state,
                businessDelete: action.payload,
                loader: false,
            };
        case actions.BUSINESS_DELETE_FAILURE:
            return { ...state, businessDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
