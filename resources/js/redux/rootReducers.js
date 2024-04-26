import authenticateReducer from './Authenticate/reducer';
import usersReducer from './Users/reducer';
import floorReducer from './Floor/reducer';
import sectionReducer from './Section/reducer';
import amenityReducer from './Amenity/reducer';
//Include all the reducer to combine and provide to configure store.
export default {
    authenticateReducer,
    usersReducer,
    floorReducer,
    sectionReducer,
    amenityReducer,
};
