import { all } from 'redux-saga/effects';
import authenticateSaga from './Authenticate/apiSaga';
import userManage from './Users/apiSaga';
import floorManage from './Floor/apiSaga';
import sectionManage from './Section/apiSaga';
import amenityManage from './Amenity/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga() {
    yield all([
        authenticateSaga(),
        userManage(),
        floorManage(),
        sectionManage(),
        amenityManage(),
    ]);
}
