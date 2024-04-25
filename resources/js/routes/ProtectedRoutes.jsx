import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
