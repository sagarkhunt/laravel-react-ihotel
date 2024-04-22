import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
function Dashboard() {
    //Getting isAuthenticated store value from Authentication reducer.

    return (
        <div className="dashboard">
            <h1>Laravel React Boilerplate</h1>
        </div>
    );
}

export default Dashboard;
