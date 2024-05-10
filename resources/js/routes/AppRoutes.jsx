// export default AppRoutes;
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../components/LoginPage.jsx';
import RegistrationForm from '../components/Register.jsx';
import DefaultLayout from '../layouts/DefaultLayout.jsx';
import GuestLayout from '../layouts/GuestLayout.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Users from '../views/user/Users.jsx';
import Floor from '../views/floor/Floor.jsx';
import Section from '../views/section/Section.jsx';
import Amenity from '../views/amenity/Amenity.jsx';
import RoomPlan from '../views/roomplan/RoomPlan.jsx';
import RoomView from '../views/roomview/RoomView.jsx';
import Inquiry from '../views/inquiry/Inquiry.jsx';
import RoomCategory from '../views/roomCategory/RoomCategory.jsx';
import Rooms from '../views/rooms/Rooms.jsx';
import BooingInq from '../views/bookingInq/BooingInq.jsx';
import { useEffect, useState } from 'react';

// Define a function to check if the user is authenticated
const isAuthenticated = () => {
    // Implement your authentication check logic here
    const authToken = localStorage.getItem('Access_Token');

    return !!authToken;
};

// Create a wrapper component for protected routes
const ProtectedRouteWrapper = ({ element }) => {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    useEffect(() => {
        // Check authentication status when the component mounts
        setAuthenticated(isAuthenticated());
    }, []);

    // If the user is authenticated, render the element
    // Otherwise, redirect to the login page
    return authenticated ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <ProtectedRouteWrapper element={<Dashboard />} />,
            },
            {
                path: '/dashboard',
                element: <ProtectedRouteWrapper element={<Dashboard />} />,
            },
            {
                path: '/user_list',
                element: <ProtectedRouteWrapper element={<Users />} />,
            },
            {
                path: '/floor',
                element: <ProtectedRouteWrapper element={<Floor />} />,
            },
            {
                path: '/section',
                element: <ProtectedRouteWrapper element={<Section />} />,
            },
            {
                path: '/amenity',
                element: <ProtectedRouteWrapper element={<Amenity />} />,
            },
            {
                path: '/rooms_plan',
                element: <ProtectedRouteWrapper element={<RoomPlan />} />,
            },
            {
                path: '/rooms_category',
                element: <ProtectedRouteWrapper element={<RoomCategory />} />,
            },
            {
                path: '/rooms',
                element: <ProtectedRouteWrapper element={<Rooms />} />,
            },
            {
                path: '/room_view',
                element: <ProtectedRouteWrapper element={<RoomView />} />,
            },
            {
                path: '/booking_inq',
                element: <ProtectedRouteWrapper element={<BooingInq />} />,
            },
            {
                path: '/inquiry_type',
                element: <ProtectedRouteWrapper element={<Inquiry />} />,
            },
        ],
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegistrationForm />,
            },
        ],
    },
]);

export default router;
