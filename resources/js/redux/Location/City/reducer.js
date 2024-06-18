import actions from './actions';

const initialCityStates = {
    cityListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    cityCreated: {},
    cityUpdate: {},
    cityDelete: {},
};

function cityReducer(state = initialCityStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.CITY_LIST:
            return { ...state, loader: true };
        case actions.CITY_LIST_SUCCESS:
            return {
                ...state,
                cityListData: action.payload,
                loader: false,
            };
        case actions.CITY_LIST_FAILURE:
            return { ...state, cityListData: [], loader: false };
        /**Add Section */
        case actions.CITY_ADD:
            return { ...state, loader: true };
        case actions.CITY_ADD_SUCCESS:
            return {
                ...state,
                cityCreated: action.payload,
                loader: false,
            };
        /**Update Section */
        case actions.CITY_UPDATE:
            return { ...state, loader: true };
        case actions.CITY_UPDATE_SUCCESS:
            return {
                ...state,
                cityUpdate: action.payload,
                loader: false,
            };
        case actions.CITY_UPDATE_FAILURE:
            return { ...state, cityUpdate: {}, loader: false };
        /**Delete Section */
        case actions.CITY_DELETE:
            return { ...state, loader: true };
        case actions.CITY_DELETE_SUCCESS:
            return {
                ...state,
                cityDelete: action.payload,
                loader: false,
            };
        case actions.CITY_DELETE_FAILURE:
            return { ...state, cityDelete: {}, loader: false };
        default:
            return state;
    }
}

export default cityReducer;
