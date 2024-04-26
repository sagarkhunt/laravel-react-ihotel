import authenticateReducer from './Authenticate/reducer';
import usersReducer from './Users/reducer';
//Include all the reducer to combine and provide to configure store.
export default {
    authenticateReducer,
    usersReducer,
};
