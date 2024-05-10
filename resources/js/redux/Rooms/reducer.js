import actions from '../Rooms/actions';

const initialStates = {
    roomsListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    roomsCreated: {},
    roomsUpdate: {},
    roomsDelete: {},
    addMutliRooms: {},
    dropDownList: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Room Plan List */
        case actions.ROOMS_LIST:
            return { ...state, loader: true };
        case actions.ROOMS_LIST_SUCCESS:
            return {
                ...state,
                roomsListData: action.payload,
                loader: false,
            };
        case actions.ROOMS_LIST_FAILURE:
            return { ...state, roomsListData: [], loader: false };
        /**Add Room Plan */
        case actions.ROOMS_ADD:
            return { ...state, loader: true };
        case actions.ROOMS_ADD_SUCCESS:
            return {
                ...state,
                roomsCreated: action.payload,
                loader: false,
            };
        /**Update Room Plan */
        case actions.ROOMS_UPDATE:
            return { ...state, loader: true };
        case actions.ROOMS_UPDATE_SUCCESS:
            return {
                ...state,
                roomsUpdate: action.payload,
                loader: false,
            };
        case actions.ROOMS_UPDATE_FAILURE:
            return { ...state, roomsUpdate: {}, loader: false };
        /**Delete Room  */
        case actions.ROOMS_DELETE:
            return { ...state, loader: true };
        case actions.ROOMS_DELETE_SUCCESS:
            return {
                ...state,
                roomsDelete: action.payload,
                loader: false,
            };
        case actions.ROOMS_DELETE_FAILURE:
            return { ...state, roomsDelete: {}, loader: false };
        /**Add Multiple Room  */
        case actions.ROOMS_MULTIPLE_ADD:
            return { ...state, loader: true };
        case actions.ROOMS_MULTIPLE_ADD_SUCCESS:
            return {
                ...state,
                addMutliRooms: action.payload,
                loader: false,
            };
        case actions.ROOMS_MULTIPLE_ADD_FAILURE:
            return { ...state, addMutliRooms: {}, loader: false };
        /**Room Plan List */
        case actions.ROOMS_DROPDOWN_LIST:
            return { ...state, loader: true };
        case actions.ROOMS_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                dropDownList: action.payload,
                loader: false,
            };
        case actions.ROOMS_DROPDOWN_LIST_FAILURE:
            return { ...state, dropDownList: [], loader: false };
        default:
            return state;
    }
}

export default Reducer;
