import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import actions from '../redux/Authenticate/actions';
import { useDispatch } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const authToken = localStorage.getItem('Access_Token');
    const dispatch = useDispatch();
    if (!isAuthenticated && authToken === null) {
        return <Navigate to="/login" />;
    }
    // const isUserLoggedIn = () => {
    //     return localStorage.getItem('Access_Token') ? true : false;
    // };
    // useEffect(() => {
    //     if (isUserLoggedIn()) {
    //         dispatch({
    //             type: actions.VERIFYTOKEN,
    //         });
    //     }
    // }, []);
    return children;
};

export default ProtectedRoute;
