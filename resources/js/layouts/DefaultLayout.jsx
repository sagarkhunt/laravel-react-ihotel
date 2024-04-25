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
            <div className="content">
                {/* <header>
                <div>
                    Header
                </div>
                <div>
                    
                    <a href="#"  classNameName="btn-logout"> Logout</a>
                </div>
            </header> */}
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
