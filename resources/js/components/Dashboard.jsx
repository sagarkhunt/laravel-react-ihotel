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
            <Link to="/user_list" className="">
                <button type="button" className="btn btn-primary me-2">
                    User Management
                </button>
            </Link>
            <Link to="/floor">
                <button type="button" className="btn btn-primary me-2">
                    Floor
                </button>
            </Link>
            <Link to="/section">
                <button type="button" className="btn btn-primary me-2">
                    Section
                </button>
            </Link>
            <Link to="/amenity">
                <button type="button" className="btn btn-primary">
                    Amenity
                </button>
            </Link>
        </div>
    );
}

export default Dashboard;
