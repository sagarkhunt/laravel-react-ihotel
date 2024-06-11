import actions from './actions';

const initialStates = {
    marketSegmentListData: {},
    error: {},
    loader: false,
    logOutLoader: false,
    marketSegmentCreated: {},
    marketSegmentUpdate: {},
    marketSegmentDelete: {},
};

function Reducer(state = initialStates, action) {
    switch (action.type) {
        /**MarketSegment List */
        case actions.MARKETSEGMENT_LIST:
            return { ...state, loader: true };
        case actions.MARKETSEGMENT_LIST_SUCCESS:
            return {
                ...state,
                marketSegmentListData: action.payload,
                loader: false,
            };
        case actions.MARKETSEGMENT_LIST_FAILURE:
            return { ...state, marketSegmentListData: [], loader: false };
        /**Add MarketSegment */
        case actions.MARKETSEGMENT_ADD:
            return { ...state, loader: true };
        case actions.MARKETSEGMENT_ADD_SUCCESS:
            return {
                ...state,
                marketSegmentCreated: action.payload,
                loader: false,
            };
        case actions.MARKETSEGMENT_ADD_FAILURE:
            return { ...state, marketSegmentCreated: {}, loader: false };
        /**Update MarketSegment */
        case actions.MARKETSEGMENT_UPDATE:
            return { ...state, loader: true };
        case actions.MARKETSEGMENT_UPDATE_SUCCESS:
            return {
                ...state,
                marketSegmentUpdate: action.payload,
                loader: false,
            };
        case actions.MARKETSEGMENT_UPDATE_FAILURE:
            return { ...state, marketSegmentUpdate: {}, loader: false };
        /**Delete MarketSegment */
        case actions.MARKETSEGMENT_DELETE:
            return { ...state, loader: true };
        case actions.MARKETSEGMENT_DELETE_SUCCESS:
            return {
                ...state,
                marketSegmentDelete: action.payload,
                loader: false,
            };
        case actions.MARKETSEGMENT_DELETE_FAILURE:
            return { ...state, marketSegmentDelete: {}, loader: false };
        default:
            return state;
    }
}

export default Reducer;
