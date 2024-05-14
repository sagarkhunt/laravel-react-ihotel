import { all } from 'redux-saga/effects';
import authenticateSaga from './Authenticate/apiSaga';
import userManage from './Users/apiSaga';
import floorManage from './Floor/apiSaga';
import sectionManage from './Section/apiSaga';
import amenityManage from './Amenity/apiSaga';
import roomPlanManage from './RoomPlan/apiSaga';
import roomViewManage from './RoomView/apiSaga';
import inqeiryManage from './Inquiry/apiSaga';
import roomCateManage from './RoomCategory/apiSaga';
import roomsSaga from './Rooms/apiSaga';
import bookingInq from './BookingInquiry/apiSaga';
import businessManage from './BusinessSource/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga() {
    yield all([
        authenticateSaga(),
        userManage(),
        floorManage(),
        sectionManage(),
        amenityManage(),
        roomPlanManage(),
        roomViewManage(),
        inqeiryManage(),
        roomCateManage(),
        roomsSaga(),
        bookingInq(),
        businessManage(),
    ]);
}
