import actions from '../Users/actions';

const initialStates = {
    userListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    userCreateed: {},
    userUpdate: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**User List */
        case actions.USER_LIST:
            return { ...state, loader: true };
        case actions.USER_LIST_SUCCESS:
            return {
                ...state,
                userListData: action.payload,
                loader: false,
            };
        case actions.USER_LIST_FAILURE:
            return { ...state, userListData: [], loader: false };
        /**Add User */
        case actions.USER_ADD:
            return { ...state, loader: true };
        case actions.USER_ADD_SUCCESS:
            return {
                ...state,
                userCreateed: action.payload,
                loader: false,
            };
        /**Update User */
        case actions.USER_UPDATE:
            return { ...state, loader: true };
        case actions.USER_UPDATE_SUCCESS:
            return {
                ...state,
                userUpdate: action.payload,
                loader: false,
            };
        case actions.USER_UPDATE_FAILURE:
            return { ...state, userUpdate: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
