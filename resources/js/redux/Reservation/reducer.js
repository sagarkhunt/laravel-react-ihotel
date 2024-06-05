import actions from '../Reservation/actions';

const initialStates = {
    reserListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    resCreated: {},
    reserUpdate: {},
    reserDelete: {},
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
        default:
            return state;
    }
}

export default Reducer;
