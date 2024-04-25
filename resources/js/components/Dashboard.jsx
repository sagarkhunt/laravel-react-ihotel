import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/Authenticate/actions';

import Spinner from './Spinner';
function Dashboard() {    
    const { isAuthenticated } = useSelector((state) => state.authenticateReducer); 
    
    return (
        <div className="dashboard">
            <h1>Laravel React js Dashboard</h1>
        </div>
    );
}

export default Dashboard;
