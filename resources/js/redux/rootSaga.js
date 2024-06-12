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
import bookingManage from './BookingSource/apiSaga';
import cpManage from './CancellPolicy/apiSaga';
import tncManage from './TermConition/apiSaga';
import reserManage from './Reservation/apiSaga';
import guestManage from './GuestClass/apiSaga';
import salesPersonManage from './SalesPerson/apiSaga';
import marketSegmentManage from './MarketSegment/apiSaga';
import idTypeManage from './IDType/apiSaga';
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
        bookingManage(),
        cpManage(),
        tncManage(),
        reserManage(),
        guestManage(),
        salesPersonManage(),
        marketSegmentManage(),
        idTypeManage(),
    ]);
}
