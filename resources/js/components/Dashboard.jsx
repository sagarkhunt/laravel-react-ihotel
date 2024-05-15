import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/Authenticate/actions';

import Spinner from './Spinner';
import { Link } from 'react-router-dom';
function Dashboard() {
    // const { isAuthenticated } = useSelector((state) => state.authenticateReducer);

    return <div className="dashboard"></div>;
}

export default Dashboard;
