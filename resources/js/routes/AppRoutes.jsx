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
import BookingInq from '../views/bookingInq/BooingInq.jsx';
import Business from '../views/businessSource/Business.jsx';
import { useEffect, useState } from 'react';
import AddReservation from '../views/reservation/AddReservation.jsx';
import ReservationList from '../views/reservation/ReservationList.jsx';
import HotelProfile from '../views/Profile/HotelProfile.jsx';
import Booking from '../views/bookingSource/Booking.jsx';
import CPList from '../views/cancelPolicy/CPList.jsx';
import TncList from '../views/TNC/TncList.jsx';
import HouseKeeping from '../views/HouseKeeping/HouseKeeping.jsx';
import FrontView from '../views/frontView/FrontView.jsx';
import EditReservtionInfo from '../views/reservation/EditReservtionInfo.jsx';
import GuestClass from '../views/guestClass/GuestClass.jsx';

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
                path: '/add-reservation',
                element: <ProtectedRouteWrapper element={<AddReservation />} />,
            },
            {
                path: '/edit_res_info',
                element: (
                    <ProtectedRouteWrapper element={<EditReservtionInfo />} />
                ),
            },
            {
                path: '/reservation-list',
                element: (
                    <ProtectedRouteWrapper element={<ReservationList />} />
                ),
            },
            {
                path: '/booking_inq',
                element: <ProtectedRouteWrapper element={<BookingInq />} />,
            },
            {
                path: '/inquiry_type',
                element: <ProtectedRouteWrapper element={<Inquiry />} />,
            },
            {
                path: '/business_source',
                element: <ProtectedRouteWrapper element={<Business />} />,
            },
            {
                path: '/booking_source',
                element: <ProtectedRouteWrapper element={<Booking />} />,
            },
            {
                path: '/hotel_profile',
                element: <ProtectedRouteWrapper element={<HotelProfile />} />,
            },
            {
                path: '/cancell_policy',
                element: <ProtectedRouteWrapper element={<CPList />} />,
            },
            {
                path: '/tnc',
                element: <ProtectedRouteWrapper element={<TncList />} />,
            },
            {
                path: '/house_keeping',
                element: <ProtectedRouteWrapper element={<HouseKeeping />} />,
            },
            {
                path: '/front_view',
                element: <ProtectedRouteWrapper element={<FrontView />} />,
            },
            {
                path: '/guest_class',
                element: <ProtectedRouteWrapper element={<GuestClass />} />,
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
