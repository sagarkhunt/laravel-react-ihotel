import actions from '../Section/actions';

const initialStates = {
    sectionListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    sectionCreated: {},
    sectionUpdate: {},
    sectionDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Section List */
        case actions.SECTION_LIST:
            return { ...state, loader: true };
        case actions.SECTION_LIST_SUCCESS:
            return {
                ...state,
                sectionListData: action.payload,
                loader: false,
            };
        case actions.SECTION_LIST_FAILURE:
            return { ...state, sectionListData: [], loader: false };
        /**Add Section */
        case actions.SECTION_ADD:
            return { ...state, loader: true };
        case actions.SECTION_ADD_SUCCESS:
            return {
                ...state,
                sectionCreated: action.payload,
                loader: false,
            };
        /**Update Section */
        case actions.SECTION_UPDATE:
            return { ...state, loader: true };
        case actions.SECTION_UPDATE_SUCCESS:
            return {
                ...state,
                sectionUpdate: action.payload,
                loader: false,
            };
        case actions.SECTION_UPDATE_FAILURE:
            return { ...state, sectionUpdate: {}, loader: false };
        /**Delete Section */
        case actions.SECTION_DELETE:
            return { ...state, loader: true };
        case actions.SECTION_DELETE_SUCCESS:
            return {
                ...state,
                sectionDelete: action.payload,
                loader: false,
            };
        case actions.SECTION_DELETE_FAILURE:
            return { ...state, sectionDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
