// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';


ReactDOM.createRoot(document.getElementById('app')).render(
  <Provider store={store()}>
    <React.StrictMode>
    <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
);
