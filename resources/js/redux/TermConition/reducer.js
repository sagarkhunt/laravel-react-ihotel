import actions from '../TermConition/actions';

const initialStates = {
    tncListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    tncCreated: {},
    tncUpdate: {},
    tncDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.TNC_LIST:
            return { ...state, loader: true };
        case actions.TNC_LIST_SUCCESS:
            return {
                ...state,
                tncListData: action.payload,
                loader: false,
            };
        case actions.TNC_LIST_FAILURE:
            return { ...state, tncListData: [], loader: false };
        /**Add Section */
        case actions.TNC_ADD:
            return { ...state, loader: true };
        case actions.TNC_ADD_SUCCESS:
            return {
                ...state,
                tncCreated: action.payload,
                loader: false,
            };
        /**Update Business */
        case actions.TNC_UPDATE:
            return { ...state, loader: true };
        case actions.TNC_UPDATE_SUCCESS:
            return {
                ...state,
                tncUpdate: action.payload,
                loader: false,
            };
        case actions.TNC_UPDATE_FAILURE:
            return { ...state, tncUpdate: {}, loader: false };
        /**Delete Business */
        case actions.TNC_DELETE:
            return { ...state, loader: true };
        case actions.TNC_DELETE_SUCCESS:
            return {
                ...state,
                tncDelete: action.payload,
                loader: false,
            };
        case actions.TNC_DELETE_FAILURE:
            return { ...state, tncDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
