import actions from './actions';

const initialCountryStates = {
    countryListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    countryCreated: {},
    countryUpdate: {},
    countryDelete: {},
};

function countryReducer(state = initialCountryStates, action) {
    switch (action.type) {
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
        case actions.COUNTRY_DROPDOWN_LIST:
            return { ...state, loader: true };
        case actions.COUNTRY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                dropDownList: action.payload,
                loader: false,
            };
        case actions.COUNTRY_DROPDOWN_LIST_FAILURE:
            return { ...state, dropDownList: {}, loader: false };
        default:
            return state;
    }
}

export default countryReducer;
