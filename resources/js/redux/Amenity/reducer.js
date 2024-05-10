import actions from '../Amenity/actions';

const initialStates = {
    amenityListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    amenityCreated: {},
    amenityUpdate: {},
    amenityDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.AMENITY_LIST:
            return { ...state, loader: true };
        case actions.AMENITY_LIST_SUCCESS:
            return {
                ...state,
                amenityListData: action.payload,
                loader: false,
            };
        case actions.AMENITY_LIST_FAILURE:
            return { ...state, amenityListData: [], loader: false };
        /**Add Section */
        case actions.AMENITY_ADD:
            return { ...state, loader: true };
        case actions.AMENITY_ADD_SUCCESS:
            return {
                ...state,
                amenityCreated: action.payload,
                loader: false,
            };
        /**Update Amenity */
        case actions.AMENITY_UPDATE:
            return { ...state, loader: true };
        case actions.AMENITY_UPDATE_SUCCESS:
            return {
                ...state,
                amenityUpdate: action.payload,
                loader: false,
            };
        case actions.AMENITY_UPDATE_FAILURE:
            return { ...state, amenityUpdate: {}, loader: false };
        /**Delete Amenity */
        case actions.AMENITY_DELETE:
            return { ...state, loader: true };
        case actions.AMENITY_DELETE_SUCCESS:
            return {
                ...state,
                amenityDelete: action.payload,
                loader: false,
            };
        case actions.AMENITY_DELETE_FAILURE:
            return { ...state, amenityDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
