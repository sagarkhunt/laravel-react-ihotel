import actions from '../Amenity/actions';

const initialStates = {
    amenityListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    amenityCreated: {},
    amenityUpdate: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.AMENITY_LIST:
            return { ...state, loader: true };
        case actions.AMENITY_LIST_SUCCESS:
            console.log(action.payload, '=====');
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
        /**Update Section */
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
        default:
            return state;
    }
}

export default Reducer;
