import actions from './actions';

const initialStates = {
    error: {},
    loader: false,
    logOutLoader: false,

    cityListData: {},
    cityCreated: {},
    cityUpdate: {},
    cityDelete: {},

    stateListData: {},
    stateCreated: {},
    stateUpdate: {},
    stateDelete: {},

    countryListData: {},
    countryCreated: {},
    countryUpdate: {},
    countryDelete: {},
};

function locationReducer(state = initialStates, action) {
    switch (action.type) {
        /**
         *
         * CITY REDUCER
         *
         */
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

        /**
         *
         * COUNTRY REDUCER
         *
         */
        /**Section List */
        case actions.COUNTRY_LIST:
            return { ...state, loader: true };
        case actions.COUNTRY_LIST_SUCCESS:
            return {
                ...state,
                countryListData: action.payload,
                loader: false,
            };
        case actions.COUNTRY_LIST_FAILURE:
            return { ...state, countryListData: [], loader: false };
        /**Add Section */
        case actions.COUNTRY_ADD:
            return { ...state, loader: true };
        case actions.COUNTRY_ADD_SUCCESS:
            return {
                ...state,
                countryCreated: action.payload,
                loader: false,
            };
        /**Update Section */
        case actions.COUNTRY_UPDATE:
            return { ...state, loader: true };
        case actions.COUNTRY_UPDATE_SUCCESS:
            return {
                ...state,
                countryUpdate: action.payload,
                loader: false,
            };
        case actions.COUNTRY_UPDATE_FAILURE:
            return { ...state, countryUpdate: {}, loader: false };
        /**Delete Section */
        case actions.COUNTRY_DELETE:
            return { ...state, loader: true };
        case actions.COUNTRY_DELETE_SUCCESS:
            return {
                ...state,
                countryDelete: action.payload,
                loader: false,
            };
        case actions.COUNTRY_DELETE_FAILURE:
            return { ...state, countryDelete: {}, loader: false };
        /**DROP DOWN SECTION */
        case actions.DROPDOWN_LIST:
            return { ...state, loader: true };
        case actions.DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                dropDownList: action.payload,
                loader: false,
            };
        case actions.DROPDOWN_LIST_FAILURE:
            return { ...state, dropDownList: {}, loader: false };

        /**
         *
         * STATE REDUCER
         *
         */
        /**Section List */
        case actions.STATE_LIST:
            return { ...state, loader: true };
        case actions.STATE_LIST_SUCCESS:
            return {
                ...state,
                stateListData: action.payload,
                loader: false,
            };
        case actions.STATE_LIST_FAILURE:
            return { ...state, stateListData: [], loader: false };
        /**Add Section */
        case actions.STATE_ADD:
            return { ...state, loader: true };
        case actions.STATE_ADD_SUCCESS:
            return {
                ...state,
                stateCreated: action.payload,
                loader: false,
            };
        /**Update Section */
        case actions.STATE_UPDATE:
            return { ...state, loader: true };
        case actions.STATE_UPDATE_SUCCESS:
            return {
                ...state,
                stateUpdate: action.payload,
                loader: false,
            };
        case actions.STATE_UPDATE_FAILURE:
            return { ...state, stateUpdate: {}, loader: false };
        /**Delete Section */
        case actions.STATE_DELETE:
            return { ...state, loader: true };
        case actions.STATE_DELETE_SUCCESS:
            return {
                ...state,
                stateDelete: action.payload,
                loader: false,
            };
        case actions.STATE_DELETE_FAILURE:
            return { ...state, stateDelete: {}, loader: false };
       
        default:
            return state;
    }
}

export default locationReducer;
