import authenticateReducer from './Authenticate/reducer';
import usersReducer from './Users/reducer';
import floorReducer from './Floor/reducer';
import sectionReducer from './Section/reducer';
import amenityReducer from './Amenity/reducer';
import roomPlanReducer from './RoomPlan/reducer';
import roomViewReduce from './RoomView/reducer';
import inquiryReducer from './Inquiry/reducer';
import roomCateReducer from './RoomCategory/reducer';
//Include all the reducer to combine and provide to configure store.
export default {
    authenticateReducer,
    usersReducer,
    floorReducer,
    sectionReducer,
    amenityReducer,
    roomPlanReducer,
    roomViewReduce,
    inquiryReducer,
    roomCateReducer,
};
