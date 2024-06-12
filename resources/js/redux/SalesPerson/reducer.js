import actions from './actions';

const initialStates = {
    salesPersonListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    salesPersonCreated: {},
    salesPersonUpdate: {},
    salesPersonDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**SalesPerson List */
        case actions.SALESPERSON_LIST:
            return { ...state, loader: true };
        case actions.SALESPERSON_LIST_SUCCESS:
            return {
                ...state,
                salesPersonListData: action.payload,
                loader: false,
            };
        case actions.SALESPERSON_LIST_FAILURE:
            return { ...state, salesPersonListData: [], loader: false };
        /**Add SalesPerson */
        case actions.SALESPERSON_ADD:
            return { ...state, loader: true };
        case actions.SALESPERSON_ADD_SUCCESS:
            return {
                ...state,
                salesPersonCreated: action.payload,
                loader: false,
            };
        case actions.SALESPERSON_ADD_FAILURE:
            return { ...state, salesPersonCreated: {}, loader: false };
        /**Update SalesPerson */
        case actions.SALESPERSON_UPDATE:
            return { ...state, loader: true };
        case actions.SALESPERSON_UPDATE_SUCCESS:
            return {
                ...state,
                salesPersonUpdate: action.payload,
                loader: false,
            };
        case actions.SALESPERSON_UPDATE_FAILURE:
            return { ...state, salesPersonUpdate: {}, loader: false };
        /**Delete SalesPerson */
        case actions.SALESPERSON_DELETE:
            return { ...state, loader: true };
        case actions.SALESPERSON_DELETE_SUCCESS:
            return {
                ...state,
                salesPersonDelete: action.payload,
                loader: false,
            };
        case actions.SALESPERSON_DELETE_FAILURE:
            return { ...state, salesPersonDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
