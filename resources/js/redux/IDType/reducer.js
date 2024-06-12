import idTypeActions from './actions';

const initialStates = {
    idTypeListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    idTypeCreated: {},
    idTypeUpdate: {},
    idTypeDelete: {},
};

function idTypeReducer(state = initialStates, action) {
    switch (action.type) {
        /** ID Type List */
        case idTypeActions.ID_TYPE_LIST:
            return { ...state, loader: true };
        case idTypeActions.ID_TYPE_LIST_SUCCESS:
            return {
                ...state,
                idTypeListData: action.payload,
                loader: false,
            };
        case idTypeActions.ID_TYPE_LIST_FAILURE:
            return { ...state, idTypeListData: [], loader: false };
        /** Add ID Type */
        case idTypeActions.ID_TYPE_ADD:
            return { ...state, loader: true };
        case idTypeActions.ID_TYPE_ADD_SUCCESS:
            return {
                ...state,
                idTypeCreated: action.payload,
                loader: false,
            };
        case idTypeActions.ID_TYPE_ADD_FAILURE:
            return { ...state, idTypeCreated: {}, loader: false };
        /** Update ID Type */
        case idTypeActions.ID_TYPE_UPDATE:
            return { ...state, loader: true };
        case idTypeActions.ID_TYPE_UPDATE_SUCCESS:
            return {
                ...state,
                idTypeUpdate: action.payload,
                loader: false,
            };
        case idTypeActions.ID_TYPE_UPDATE_FAILURE:
            return { ...state, idTypeUpdate: {}, loader: false };
        /** Delete ID Type */
        case idTypeActions.ID_TYPE_DELETE:
            return { ...state, loader: true };
        case idTypeActions.ID_TYPE_DELETE_SUCCESS:
            return {
                ...state,
                idTypeDelete: action.payload,
                loader: false,
            };
        case idTypeActions.ID_TYPE_DELETE_FAILURE:
            return { ...state, idTypeDelete: {}, loader: false };
        default:
            return state;
    }
}

export default idTypeReducer;
