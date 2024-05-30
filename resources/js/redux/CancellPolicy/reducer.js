import actions from '../CancellPolicy/actions';

const initialStates = {
    CPListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    CPCreated: {},
    CPUpdate: {},
    CPDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.CP_LIST:
            return { ...state, loader: true };
        case actions.CP_LIST_SUCCESS:
            return {
                ...state,
                CPListData: action.payload,
                loader: false,
            };
        case actions.CP_LIST_FAILURE:
            return { ...state, CPListData: [], loader: false };
        /**Add Section */
        case actions.CP_ADD:
            return { ...state, loader: true };
        case actions.CP_ADD_SUCCESS:
            return {
                ...state,
                CPCreated: action.payload,
                loader: false,
            };
        /**Update Business */
        case actions.CP_UPDATE:
            return { ...state, loader: true };
        case actions.CP_UPDATE_SUCCESS:
            return {
                ...state,
                CPUpdate: action.payload,
                loader: false,
            };
        case actions.CP_UPDATE_FAILURE:
            return { ...state, CPUpdate: {}, loader: false };
        /**Delete Business */
        case actions.CP_DELETE:
            return { ...state, loader: true };
        case actions.CP_DELETE_SUCCESS:
            return {
                ...state,
                CPDelete: action.payload,
                loader: false,
            };
        case actions.CP_DELETE_FAILURE:
            return { ...state, CPDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
