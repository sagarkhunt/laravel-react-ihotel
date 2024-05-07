import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import axiosClient from "../axiosClient";
// import { useStateContext } from "../contexts/contextprovider";

export default function DefaultLayout() {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // const onLogout =  (ev) =>{
    //     ev.preventDefault();
    //     axiosClient.get('/logout')
    //     .then(({}) => {
    //        setUser(null)
    //        setToken(null)
    //     })
    // }

    // useEffect(() => {
    //     axiosClient.get('/user')
    //       .then(({data}) => {
    //          setUser(data)
    //       })
    //   }, [])

    return (
        <div id="defaultLayout">
            <Navbar />
            <div className="content">
                {/* <aside className="sidebar">
                    Sidebar content goes here
                    <ul>
                        <li>
                            <a href="#">Link 1</a>
                        </li>
                        <li>
                            <a href="#">Link 2</a>
                        </li>
                        <li>
                            <a href="#">Link 3</a>
                        </li>
                    </ul>
                </aside> */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
