// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';

import { ContextProvider } from './AuthContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('app')).render(
    <ContextProvider>
        <Provider store={store()}>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    style: {
                        background: '#000',
                        color: '#fff',
                        zIndex: 9999,
                    },
                }}
            />
            <RouterProvider router={router} />
        </Provider>
    </ContextProvider>,
);
