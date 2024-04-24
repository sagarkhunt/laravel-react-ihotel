import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/Authenticate/actions';

import Spinner from './Spinner';
function Dashboard() {
    //Getting isAuthenticated store value from Authentication reducer.
    const { isAuthenticated, validateUserLoader } = useSelector(
        (state) => state.authenticateReducer,
    );
    // console.log('🚀 ~ Dashboard ~ isAuthenticated:', isAuthenticated);
    // const dispatch = useDispatch();

    console.log("🚀 ~ Dashboard ~ isAuthenticated:", isAuthenticated)
    // useEffect(() => {
        
    //         dispatch({
    //             type: actions.GET_AUTH_USER,
    //         });
        
    // }, []);
    return (
        <div className="dashboard">
            <h1>Laravel React</h1>
        </div>
    );
}

export default Dashboard;
