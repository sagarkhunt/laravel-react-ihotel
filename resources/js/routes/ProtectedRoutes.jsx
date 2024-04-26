// import React, { useEffect } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import actions from '../redux/Authenticate/actions';
// import { useDispatch } from 'react-redux';

// const ProtectedRoute = ({ children }) => {
//     const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
//     const authToken = localStorage.getItem('Access_Token') ? true : false;
//     const dispatch = useDispatch();

//     // You might dispatch actions based on the authentication status here
//     // For example, dispatch a logout action if authToken is invalid
//     // dispatch(actions.logout());

//     if (!isAuthenticated && !authToken) {
//         return <Navigate to="/login" />;
//     }

//     return children;
// };

// export default ProtectedRoute;

import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('Access_Token');
    console.log('🚀 ~ ProtectedRoute ~ isAuthenticated:', isAuthenticated);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};
export default ProtectedRoute;
