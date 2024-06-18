import actions from './actions';

const initialStateStates = {
    stateListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    stateCreated: {},
    stateUpdate: {},
    stateDelete: {},
};

function stateReducer(state = initialStateStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.STATE_LIST:
            return { ...state, loader: true };
        case actions.STATE_LIST_SUCCESS:
            return {
                ...state,
                stateListData: action.payload,
                loader: false,
            };
        case actions.STATE_LIST_FAILURE:
            return { ...state, stateListData: [], loader: false };
        /**Add Section */
        case actions.STATE_ADD:
            return { ...state, loader: true };
        case actions.STATE_ADD_SUCCESS:
            return {
                ...state,
                stateCreated: action.payload,
                loader: false,
            };
        /**Update Section */
        case actions.STATE_UPDATE:
            return { ...state, loader: true };
        case actions.STATE_UPDATE_SUCCESS:
            return {
                ...state,
                stateUpdate: action.payload,
                loader: false,
            };
        case actions.STATE_UPDATE_FAILURE:
            return { ...state, stateUpdate: {}, loader: false };
        /**Delete Section */
        case actions.STATE_DELETE:
            return { ...state, loader: true };
        case actions.STATE_DELETE_SUCCESS:
            return {
                ...state,
                stateDelete: action.payload,
                loader: false,
            };
        case actions.STATE_DELETE_FAILURE:
            return { ...state, stateDelete: {}, loader: false };
        default:
            return state;
    }
}

export default stateReducer;
