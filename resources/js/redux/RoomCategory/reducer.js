import actions from '../RoomCategory/actions';

const initialStates = {
    roomCateListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    roomCateCreated: {},
    roomCateUpdate: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Room Plan List */
        case actions.ROOMCATEGORY_LIST:
            return { ...state, loader: true };
        case actions.ROOMCATEGORY_LIST_SUCCESS:
            return {
                ...state,
                roomCateListData: action.payload,
                loader: false,
            };
        case actions.ROOMCATEGORY_LIST_FAILURE:
            return { ...state, roomCateListData: [], loader: false };
        /**Add Room Plan */
        case actions.ROOMCATEGORY_ADD:
            return { ...state, loader: true };
        case actions.ROOMCATEGORY_ADD_SUCCESS:
            return {
                ...state,
                roomCateCreated: action.payload,
                loader: false,
            };
        /**Update Room Plan */
        case actions.ROOMCATEGORY_UPDATE:
            return { ...state, loader: true };
        case actions.ROOMCATEGORY_UPDATE_SUCCESS:
            return {
                ...state,
                roomCateUpdate: action.payload,
                loader: false,
            };
        case actions.ROOMCATEGORY_UPDATE_FAILURE:
            return { ...state, roomCateUpdate: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
