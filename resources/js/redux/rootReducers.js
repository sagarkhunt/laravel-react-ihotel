import authenticateReducer from './Authenticate/reducer';
import usersReducer from './Users/reducer';
import floorReducer from './Floor/reducer';
import sectionReducer from './Section/reducer';
import amenityReducer from './Amenity/reducer';
import roomPlanReducer from './RoomPlan/reducer';
import roomViewReduce from './RoomView/reducer';
import inquiryReducer from './Inquiry/reducer';
import roomCateReducer from './RoomCategory/reducer';
import roomReducer from './Rooms/reducer';
import booingInqReducer from './BookingInquiry/reducer';
import businessReducer from './BusinessSource/reducer';
import bookingReducer from './BookingSource/reducer';
import cpReducer from './CancellPolicy/reducer';
import tncReducer from './TermConition/reducer';
import reserReducer from './Reservation/reducer';
import guestReducer from './GuestClass/reducer';
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
    roomReducer,
    booingInqReducer,
    businessReducer,
    bookingReducer,
    cpReducer,
    tncReducer,
    reserReducer,
    guestReducer,
};
