import actions from '../Reservation/actions';

const initialStates = {
    reserListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    resCreated: {},
    reserUpdate: {},
    reserDelete: {},
    dropDownList: {},
    roomCateList: {},
    payTypList: {},
    catAssRoomList: {},
    reserDetails: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.RESER_LIST:
            return { ...state, loader: true };
        case actions.RESER_LIST_SUCCESS:
            return {
                ...state,
                reserListData: action.payload,
                loader: false,
            };
        case actions.RESER_LIST_FAILURE:
            return { ...state, reserListData: [], loader: false };
        /**Add Section */
        case actions.RESER_ADD:
            return { ...state, loader: true };
        case actions.RESER_ADD_SUCCESS:
            return {
                ...state,
                resCreated: action.payload,
                loader: false,
            };
        /**Update Amenity */
        case actions.RESER_UPDATE:
            return { ...state, loader: true };
        case actions.RESER_UPDATE_SUCCESS:
            return {
                ...state,
                reserUpdate: action.payload,
                loader: false,
            };
        case actions.RESER_UPDATE_FAILURE:
            return { ...state, reserUpdate: {}, loader: false };
        /**Delete Amenity */
        case actions.RESER_DELETE:
            return { ...state, loader: true };
        case actions.RESER_DELETE_SUCCESS:
            return {
                ...state,
                reserDelete: action.payload,
                loader: false,
            };
        case actions.RESER_DELETE_FAILURE:
            return { ...state, reserDelete: {}, loader: false };
        /**Dropdown List */
        case actions.RESER_DROPDOWN_LIST:
            return { ...state, loader: true };
        case actions.RESER_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                dropDownList: action.payload,
                loader: false,
            };
        case actions.RESER_DROPDOWN_LIST_FAILURE:
            return { ...state, dropDownList: {}, loader: false };
        // room cate list
        case actions.AVLBL_ROOM_CATE_LIST:
            return { ...state, loader: true };
        case actions.AVLBL_ROOM_CAT_SUCCESS:
            return {
                ...state,
                roomCateList: action.payload,
                loader: false,
            };
        case actions.AVLBL_ROOM_CAT_FAILURE:
            return { ...state, roomCateList: [], loader: false };

        case actions.PAY_TYP_LIST:
            return { ...state, loader: true };
        case actions.PAY_TYPE_SUCCESS:
            return {
                ...state,
                payTypList: action.payload,
                loader: false,
            };
        case actions.PAY_TYPE_FAILURE:
            return { ...state, roomCateList: [], loader: false };
        case actions.CAT_ASSIGN_ROOMS_LIST:
            return { ...state, loader: true };
        case actions.CAT_ASSIGN_ROOMS_SUCCESS:
            return {
                ...state,
                catAssRoomList: action.payload,
                loader: false,
            };
        case actions.CAT_ASSIGN_ROOMS_FAILURE:
            return { ...state, catAssRoomList: [], loader: false };
        case actions.RESER_GET_DETAILS:
            return { ...state, loader: true };
        case actions.RESER_GET_DETAILS_SUCCESS:
            return {
                ...state,
                reserDetails: action.payload,
                loader: false,
            };
        case actions.RESER_GET_DETAILS_FAILURE:
            return { ...state, reserDetails: [], loader: false };
        default:
            return state;
    }
}

export default Reducer;
