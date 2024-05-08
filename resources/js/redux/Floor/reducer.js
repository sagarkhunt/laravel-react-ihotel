import actions from '../Floor/actions';

const initialStates = {
    floorListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    floorCreateed: {},
    floorUpdate: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Floor List */
        case actions.FLOOR_LIST:
            return { ...state, loader: true };
        case actions.FLOOR_LIST_SUCCESS:
            return {
                ...state,
                floorListData: action.payload,
                loader: false,
            };
        case actions.USER_LIST_FAILURE:
            return { ...state, floorListData: [], loader: false };
        /**Add Floor */
        case actions.FLOOR_ADD:
            return { ...state, loader: true };
        case actions.FLOOR_ADD_SUCCESS:
            return {
                ...state,
                floorCreateed: action.payload,
                loader: false,
            };
        /**Update Floor */
        case actions.FLOOR_UPDATE:
            return { ...state, loader: true };
        case actions.FLOOR_UPDATE_SUCCESS:
            return {
                ...state,
                floorUpdate: action.payload,
                loader: false,
            };
        case actions.FLOOR_UPDATE_FAILURE:
            return { ...state, floorUpdate: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
