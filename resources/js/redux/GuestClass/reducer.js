import actions from './actions';

const initialStates = {
    guestListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    guestCreated: {},
    guestUpdate: {},
    guestDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Guest List */
        case actions.GUEST_LIST:
            return { ...state, loader: true };
        case actions.GUEST_LIST_SUCCESS:
            return {
                ...state,
                guestListData: action.payload,
                loader: false,
            };
        case actions.GUEST_LIST_FAILURE:
            return { ...state, guestListData: [], loader: false };
        /**Add Guest */
        case actions.GUEST_ADD:
            return { ...state, loader: true };
        case actions.GUEST_ADD_SUCCESS:
            return {
                ...state,
                guestCreated: action.payload,
                loader: false,
            };
        /**Update Guest */
        case actions.GUEST_UPDATE:
            return { ...state, loader: true };
        case actions.GUEST_UPDATE_SUCCESS:
            return {
                ...state,
                guestUpdate: action.payload,
                loader: false,
            };
        case actions.GUEST_UPDATE_FAILURE:
            return { ...state, guestUpdate: {}, loader: false };
        /**Delete Guest */
        case actions.GUEST_DELETE:
            return { ...state, loader: true };
        case actions.GUEST_DELETE_SUCCESS:
            return {
                ...state,
                guestDelete: action.payload,
                loader: false,
            };
        case actions.GUEST_DELETE_FAILURE:
            return { ...state, guestDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
