import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/Authenticate/actions';

import Spinner from './Spinner';
import { Link } from 'react-router-dom';
function Dashboard() {
    // const { isAuthenticated } = useSelector((state) => state.authenticateReducer);

    return (
        <div className="dashboard">
            <h1>Laravel React js Dashboard</h1>
            <Link to="/user_list">
                <button type="button" className="btn btn-primary">
                    User Management
                </button>
            </Link>
        </div>
    );
}

export default Dashboard;
