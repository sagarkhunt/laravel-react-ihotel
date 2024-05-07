import actions from '../RoomPlan/actions';

const initialStates = {
    roomPlanListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    roomPlanCreated: {},
    roomPlanUpdate: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**Room Plan List */
        case actions.ROOMPLAN_LIST:
            return { ...state, loader: true };
        case actions.ROOMPLAN_LIST_SUCCESS:
            return {
                ...state,
                roomPlanListData: action.payload,
                loader: false,
            };
        case actions.ROOMPLAN_LIST_FAILURE:
            return { ...state, roomPlanListData: [], loader: false };
        /**Add Room Plan */
        case actions.ROOMPLAN_ADD:
            return { ...state, loader: true };
        case actions.ROOMPLAN_ADD_SUCCESS:
            return {
                ...state,
                roomPlanCreated: action.payload,
                loader: false,
            };
        /**Update Room Plan */
        case actions.ROOMPLAN_UPDATE:
            return { ...state, loader: true };
        case actions.ROOMPLAN_UPDATE_SUCCESS:
            return {
                ...state,
                roomPlanUpdate: action.payload,
                loader: false,
            };
        case actions.ROOMPLAN_UPDATE_FAILURE:
            return { ...state, roomPlanUpdate: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
