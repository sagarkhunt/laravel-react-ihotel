import React, { useEffect } from 'react';
import actions from '../redux/Authenticate/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // if (typeof window !== 'undefined') {
    //     const token = localStorage.getItem('Access_Token');
    //     console.log('🚀 ~ Navbar ~ token:', token);
    //     if (token) {
    //         dispatch({
    //             type: actions.VERIFYTOKEN,
    //             payload: {
    //                 token: token,
    //             },
    //         });
    //     }
    // }
    const { isAuthenticated, loader, logOutLoader } = useSelector(
        (state) => state.authenticateReducer,
    );

    useEffect(() => {
        // if (!isAuthenticated) {
        //     navigate('/login');
        // }
    }, [isAuthenticated, navigate]);

    let onLogout = () => {
        dispatch({
            type: actions.LOGOUT,
        });
        navigate('/login');
    };
    useEffect(() => {}, []);
    return (
        <nav className="navbar navbar-light navabr_custom">
            <div className="container-fluid">
                <div className="row m-0 w-100 h-auto">
                    <div className="col-4 d-flex align-items-center ps-0">
                        <a href="#default" className="menu_header">
                            <span className="material-icons-outlined primary-icon">
                                menu
                            </span>
                        </a>
                        <a href="#default" className="navbar-brand ms-3">
                            <img
                                src="/assets/v1/images/header_logo.png"
                                className="header_logo"
                                alt=""
                            />
                        </a>
                    </div>

                    <div className="col-8 d-flex align-items-center justify-content-end pe-0">
                        <a href="#default" className="header_icons">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM5 8V6H19V8H5ZM7 12H17V14H7V12ZM7 16H14V18H7V16Z"
                                    fill="#2B363E"
                                />
                            </svg>
                        </a>
                        <a href="#default" className="header_icons ms-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M16.5 19.72H4.5V7.5H11.5V5.5H4.5C3.4 5.5 2.5 6.4 2.5 7.5V19.5C2.5 20.6 3.4 21.5 4.5 21.5H16.5C17.6 21.5 18.5 20.6 18.5 19.5V12.5H16.5V19.72Z"
                                    fill="#0863B5"
                                />
                                <path
                                    d="M18.5 2.5H16.5V5.5H13.5C13.51 5.51 13.5 7.5 13.5 7.5H16.5V10.49C16.51 10.5 18.5 10.49 18.5 10.49V7.5H21.5V5.5H18.5V2.5Z"
                                    fill="#0863B5"
                                />
                                <path
                                    d="M14.5 9.5H6.5V11.5H14.5V9.5Z"
                                    fill="#0863B5"
                                />
                                <path
                                    d="M6.5 12.5V14.5H14.5V12.5H6.5Z"
                                    fill="#0863B5"
                                />
                                <path
                                    d="M14.5 15.5H6.5V17.5H14.5V15.5Z"
                                    fill="#0863B5"
                                />
                            </svg>
                        </a>
                        <div className="dropdown ms-4">
                            <button
                                className="btn  header-drop-custom   dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                >
                                    <path
                                        d="M20 11.6667V8.33333C20 6.5 18.5 5 16.6667 5H6.66666C4.83333 5 3.33333 6.5 3.33333 8.33333V31.6667C3.33333 33.5 4.83333 35 6.66666 35H33.3333C35.1667 35 36.6667 33.5 36.6667 31.6667V15C36.6667 13.1667 35.1667 11.6667 33.3333 11.6667H20ZM10 31.6667H6.66666V28.3333H10V31.6667ZM10 25H6.66666V21.6667H10V25ZM10 18.3333H6.66666V15H10V18.3333ZM10 11.6667H6.66666V8.33333H10V11.6667ZM16.6667 31.6667H13.3333V28.3333H16.6667V31.6667ZM16.6667 25H13.3333V21.6667H16.6667V25ZM16.6667 18.3333H13.3333V15H16.6667V18.3333ZM16.6667 11.6667H13.3333V8.33333H16.6667V11.6667ZM31.6667 31.6667H20V28.3333H23.3333V25H20V21.6667H23.3333V18.3333H20V15H31.6667C32.5833 15 33.3333 15.75 33.3333 16.6667V30C33.3333 30.9167 32.5833 31.6667 31.6667 31.6667ZM30 18.3333H26.6667V21.6667H30V18.3333ZM30 25H26.6667V28.3333H30V25Z"
                                        fill="#566B7D"
                                    />
                                </svg>
                                <div className=" mx-3">
                                    <p className="subtitle-2m mb-0 text-start">
                                        Hotel Name
                                    </p>
                                    <p className="caption-1 mb-0 text-start">
                                        1234
                                    </p>
                                </div>
                            </button>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>

                                <li>
                                    <Link
                                        to="#"
                                        onClick={onLogout}
                                        className="dropdown-item"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
