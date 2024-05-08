import actions from '../RoomView/actions';

const initialStates = {
    roomViewListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    roomViewCreated: {},
    roomViewUpdate: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Room Plan List */
        case actions.ROOMVIEW_LIST:
            return { ...state, loader: true };
        case actions.ROOMVIEW_LIST_SUCCESS:
            return {
                ...state,
                roomViewListData: action.payload,
                loader: false,
            };
        case actions.ROOMVIEW_LIST_FAILURE:
            return { ...state, roomViewListData: [], loader: false };
        /**Add Room Plan */
        case actions.ROOMVIEW_ADD:
            return { ...state, loader: true };
        case actions.ROOMVIEW_ADD_SUCCESS:
            return {
                ...state,
                roomViewCreated: action.payload,
                loader: false,
            };
        /**Update Room Plan */
        case actions.ROOMVIEW_UPDATE:
            return { ...state, loader: true };
        case actions.ROOMVIEW_UPDATE_SUCCESS:
            return {
                ...state,
                roomViewUpdate: action.payload,
                loader: false,
            };
        case actions.ROOMVIEW_UPDATE_FAILURE:
            return { ...state, roomViewUpdate: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
