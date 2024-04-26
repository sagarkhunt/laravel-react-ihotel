// // src/Routes.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from '../components/pages/Home';
// import About from '../components/pages/About';
// import LoginPage from '../components/LoginPage';
// import RegistrationForm from '../components/Register';
// import ProtectedRoute from './ProtectedRoutes';
// import Dashboard from '../components/Dashboard';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegistrationForm />} />
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/about" element={<About />} />

//       {/* Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* Add other protected routes here */}
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../components/LoginPage.jsx';
import RegistrationForm from '../components/Register.jsx';
import DefaultLayout from '../layouts/DefaultLayout.jsx';
import GuestLayout from '../layouts/GuestLayout.jsx';
import Dashboard from '../components/Dashboard.jsx';
import ProtectedRoute from './ProtectedRoutes.jsx';
import Users from '../views/user/Users.jsx';
// import UserForm from './views/UserForm.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user_list',
                element: (
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                ),
            },
            // {
            //     path: '/users/new',
            //     element: <UserForm key="userCreate"/>
            // },
            // {
            //     path: '/users/:id',
            //     element: <UserForm key="userUpdate" />
            // },
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
