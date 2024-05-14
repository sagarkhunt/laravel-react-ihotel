import React, { useEffect, useState } from 'react';
import actions from '../redux/Authenticate/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/sidebar.css';

function Navbar() {
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

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
    return (
        <>
            <nav className="navbar navbar-light navabr_custom">
                <div className="container-fluid">
                    <div className="row m-0 w-100 h-auto">
                        <div className="col-4 d-flex align-items-center ps-0">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#sidebar"
                                aria-controls="sidebar"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div
                                className="offcanvas offcanvas-start"
                                tabIndex="-1"
                                id="sidebar"
                            >
                                <div className="offcanvas-header border-lb">
                                    <h5 className="offcanvas-title">
                                        <img
                                            src="Images/header_logo.png"
                                            className="header_logo"
                                            alt=""
                                        ></img>
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close text-reset"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className=" offcanvas-body">
                                    <ul className="navbar-nav" id="sidebar">
                                        <li className="">
                                            <Link
                                                className={`nav-line cp ${activeLink === '/dashboard' ? 'active' : ''}`}
                                                to="/dashboard"
                                                onClick={() =>
                                                    handleLinkClick(
                                                        '/dashboard',
                                                    )
                                                }
                                            >
                                                <svg
                                                    width="24"
                                                    className="icon_svg"
                                                    height="25"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4 13.8242H10C10.55 13.8242 11 13.3742 11 12.8242V4.82422C11 4.27422 10.55 3.82422 10 3.82422H4C3.45 3.82422 3 4.27422 3 4.82422V12.8242C3 13.3742 3.45 13.8242 4 13.8242ZM4 21.8242H10C10.55 21.8242 11 21.3742 11 20.8242V16.8242C11 16.2742 10.55 15.8242 10 15.8242H4C3.45 15.8242 3 16.2742 3 16.8242V20.8242C3 21.3742 3.45 21.8242 4 21.8242ZM14 21.8242H20C20.55 21.8242 21 21.3742 21 20.8242V12.8242C21 12.2742 20.55 11.8242 20 11.8242H14C13.45 11.8242 13 12.2742 13 12.8242V20.8242C13 21.3742 13.45 21.8242 14 21.8242ZM13 4.82422V8.82422C13 9.37422 13.45 9.82422 14 9.82422H20C20.55 9.82422 21 9.37422 21 8.82422V4.82422C21 4.27422 20.55 3.82422 20 3.82422H14C13.45 3.82422 13 4.27422 13 4.82422Z"
                                                        fill=""
                                                    />
                                                </svg>
                                                <span
                                                    type="button"
                                                    className="nav-item"
                                                    data-bs-dismiss="offcanvas"
                                                >
                                                    Dashbaord
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <div
                                                className="nav-line cp {{ collect(['resto/raw_mat_category', 'resto/raw_mat_item_group', 'resto/raw_mat_items', 'resto/suppliers', 'resto/units', 'resto/kitchen', 'resto/tax_rate', 'resto/purchase', 'resto/issue'])->contains(Request::path()) ? 'active_sub' : '' }}"
                                                href="#"
                                            >
                                                <svg
                                                    width="24"
                                                    height="25"
                                                    className="icon_svg"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15 9.32422H9V11.3242H15V9.32422Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M15.64 12.8242H8.37C7.89 12.8242 7.5 13.2142 7.5 13.6942H7.51V14.8242H16.51V13.6942C16.51 13.2142 16.12 12.8242 15.64 12.8242Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M20 2.82422H4C2.9 2.82422 2 3.72422 2 4.82422V20.8242C2 21.9242 2.9 22.8242 4 22.8242H20C21.1 22.8242 22 21.9242 22 20.8242V4.82422C22 3.72422 21.1 2.82422 20 2.82422ZM17.25 17.8242C16.84 17.8242 16.5 17.4842 16.5 17.0742V16.3242H7.5V17.0742C7.5 17.4842 7.16 17.8242 6.75 17.8242C6.34 17.8242 6 17.4842 6 17.0742V13.6942C6 12.6942 6.62 11.8442 7.5 11.4942V9.82422C7.5 8.72422 8.4 7.82422 9.5 7.82422H14.5C15.6 7.82422 16.5 8.72422 16.5 9.82422V11.4942C17.38 11.8442 18 12.6942 18 13.6942V17.0742C18 17.4842 17.66 17.8242 17.25 17.8242Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span className="nav-item">
                                                    Room Operations
                                                </span>
                                                <span className="material-icons-round cp downarrow">
                                                    chevron_right
                                                </span>
                                            </div>
                                            <div className="submenu_box p-3 y_scrolling">
                                                <ul className="sub-menu-list px-2  row">
                                                    <li className="col-12 grid_padding">
                                                        <a
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_item_group') ? 'active-icon' : '' }}"
                                                            href="{{ url('/resto/raw_mat_item_group') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M11 22H15V18H11V22ZM11 27H15V23H11V27ZM11 17H15V13H11V17ZM16 22H29V18H16V22ZM16 27H29V23H16V27ZM16 13V17H29V13H16Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                {' '}
                                                                Raw Mat. Item
                                                                Group
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <a
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_items') ? 'active-icon' : '' }}"
                                                            href="{{ url('/resto/raw_mat_items') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M17.75 10.25H20.75V11.375H17.75V10.25Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M23.7473 19.875C22.8102 19.875 22.8102 18.875 21.8731 18.875C20.936 18.875 20.9359 19.875 19.9988 19.875C19.0617 19.875 19.0614 18.875 18.124 18.875C17.1866 18.875 17.1872 19.875 16.2503 19.875C15.3126 19.875 15.3126 18.875 14.3749 18.875C13.4366 18.875 13.4366 19.875 12.4982 19.875C11.5599 19.875 11.5599 18.875 10.6216 18.875V30.5H25.2466V18.9423C24.6636 19.1643 24.5384 19.875 23.7473 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.4982 19.875C26.7059 19.875 26.5807 19.164 25.9966 18.9421V30.5H29.3749V18.875C28.4365 18.875 28.4365 19.875 27.4982 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M16.2504 19.1249C16.3719 19.1249 16.4119 19.1055 16.6397 18.8622C16.8134 18.6331 17.0379 18.4474 17.2954 18.3195C17.5529 18.1916 17.8365 18.125 18.1241 18.125C18.4116 18.125 18.6952 18.1915 18.9527 18.3194C19.2103 18.4472 19.4347 18.6329 19.6085 18.862C19.8348 19.1035 19.8766 19.1245 19.9962 19.1247C19.8636 18.3517 19.903 17.5589 20.1117 16.8028C20.3633 15.7681 20.9411 14.8419 21.7597 14.1609C21.3847 13.7426 20.9076 13.4288 20.375 13.25V12.125H18.125V13.25C17.4698 13.4684 16.8999 13.8874 16.4961 14.4477C16.0923 15.008 15.875 15.6811 15.875 16.3717V18.8777C16.0783 19.0935 16.1262 19.1249 16.2504 19.1249Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.107 18.8618C27.326 19.0955 27.3699 19.1249 27.4981 19.1249C27.6263 19.1249 27.6706 19.0955 27.8899 18.8617C27.9666 18.7799 28.0559 18.6868 28.1596 18.5946C28.4858 16.9237 27.9042 15.3968 26.7805 15.0958C26.3765 14.9973 25.9503 15.05 25.5824 15.244C25.6436 14.862 25.8292 14.511 26.1105 14.2455C26.2526 14.1379 26.416 14.062 26.5898 14.0228C26.7637 13.9837 26.9439 13.9822 27.1183 14.0185C27.1675 14.026 27.2178 14.0237 27.2661 14.0117C27.3144 13.9996 27.3598 13.9781 27.3997 13.9483C27.4395 13.9185 27.4731 13.881 27.4984 13.8382C27.5236 13.7953 27.5401 13.7478 27.5468 13.6984C27.5536 13.6491 27.5504 13.5989 27.5375 13.5509C27.5247 13.5028 27.5023 13.4577 27.4719 13.4183C27.4414 13.379 27.4034 13.3461 27.3601 13.3215C27.3168 13.297 27.269 13.2813 27.2196 13.2754C26.943 13.2241 26.6586 13.2323 26.3854 13.2995C26.1122 13.3668 25.8565 13.4915 25.6353 13.6654C25.2285 14.031 24.954 14.5208 24.8546 15.0585C24.6328 14.7009 24.2868 14.4378 23.8829 14.3196C22.6826 13.9979 21.3185 15.1968 20.836 16.9971C20.6958 17.5112 20.643 18.0453 20.6798 18.577C21.0058 18.2803 21.4324 18.1187 21.8731 18.125C22.16 18.1285 22.4424 18.1965 22.6994 18.3242C22.9563 18.4518 23.1812 18.6357 23.3573 18.8622C23.5855 19.1055 23.6254 19.1249 23.7473 19.1249C23.8693 19.1249 23.9092 19.1055 24.1373 18.8622C24.3112 18.6331 24.5357 18.4474 24.7933 18.3195C25.0508 18.1916 25.3345 18.1251 25.622 18.125C25.9096 18.125 26.1933 18.1915 26.4509 18.3193C26.7085 18.4471 26.9331 18.6328 27.107 18.8618Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M12.1069 18.8618C12.3259 19.0954 12.3699 19.1249 12.4981 19.1249C12.6262 19.1249 12.6706 19.0954 12.8899 18.8616C13.0662 18.6352 13.2913 18.4514 13.5483 18.3238C13.8054 18.1963 14.0879 18.1283 14.3749 18.125C14.6335 18.1219 14.8896 18.1758 15.1249 18.283V16.3717C15.1272 15.7126 15.2913 15.0642 15.6028 14.4834C14.3628 11.3142 12.8197 9.23724 11.7386 9.52689C10.3985 9.88599 10.2574 13.7452 11.3752 18.2846C11.655 18.4265 11.9037 18.6227 12.1069 18.8618ZM14.1848 14.5793C14.2791 14.6111 14.3567 14.6791 14.4008 14.7683C14.4449 14.8574 14.4518 14.9604 14.4199 15.0546L13.5531 17.616C13.5378 17.6632 13.5132 17.7069 13.4809 17.7445C13.4485 17.7821 13.409 17.8129 13.3647 17.8351C13.3204 17.8573 13.2721 17.8706 13.2226 17.874C13.1731 17.8775 13.1234 17.871 13.0764 17.8552C13.0295 17.8393 12.9861 17.8142 12.9488 17.7815C12.9116 17.7487 12.8812 17.7089 12.8595 17.6643C12.8378 17.6197 12.8251 17.5713 12.8222 17.5217C12.8193 17.4722 12.8263 17.4226 12.8427 17.3758L13.7095 14.8143C13.7414 14.7202 13.8094 14.6425 13.8985 14.5985C13.9877 14.5544 14.0906 14.5475 14.1848 14.5793ZM11.9693 14.4909L12.8355 11.9294C12.8682 11.8363 12.9363 11.7597 13.025 11.7165C13.1138 11.6732 13.216 11.6667 13.3095 11.6983C13.403 11.7299 13.4803 11.7971 13.5246 11.8854C13.5689 11.9736 13.5765 12.0758 13.546 12.1697L12.6799 14.7312C12.6645 14.7784 12.64 14.822 12.6076 14.8596C12.5753 14.8972 12.5358 14.928 12.4915 14.9503C12.4471 14.9725 12.3988 14.9857 12.3494 14.9892C12.2999 14.9926 12.2502 14.9862 12.2032 14.9703C12.1562 14.9544 12.1129 14.9294 12.0756 14.8966C12.0384 14.8639 12.008 14.824 11.9863 14.7794C11.9645 14.7349 11.9519 14.6864 11.949 14.6369C11.9461 14.5874 11.9529 14.5377 11.9693 14.4909Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                Raw Material
                                                                Items
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="">
                                            <Link
                                                className={`nav-line cp ${activeLink === '/booking_inq' ? 'active' : ''}`}
                                                to="/booking_inq"
                                                onClick={() =>
                                                    handleLinkClick(
                                                        '/booking_inq',
                                                    )
                                                }
                                            >
                                                <svg
                                                    width="24"
                                                    className="icon_svg"
                                                    height="25"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14.59 3.41422C14.21 3.03422 13.7 2.82422 13.17 2.82422H6C4.9 2.82422 4 3.72422 4 4.82422V20.8242C4 21.9242 4.89 22.8242 5.99 22.8242H18C19.1 22.8242 20 21.9242 20 20.8242V9.65422C20 9.12422 19.79 8.61422 19.41 8.24422L14.59 3.41422ZM15 16.8242H13V18.8242C13 19.3742 12.55 19.8242 12 19.8242C11.45 19.8242 11 19.3742 11 18.8242V16.8242H9C8.45 16.8242 8 16.3742 8 15.8242C8 15.2742 8.45 14.8242 9 14.8242H11V12.8242C11 12.2742 11.45 11.8242 12 11.8242C12.55 11.8242 13 12.2742 13 12.8242V14.8242H15C15.55 14.8242 16 15.2742 16 15.8242C16 16.3742 15.55 16.8242 15 16.8242ZM13 8.82422V4.32422L18.5 9.82422H14C13.45 9.82422 13 9.37422 13 8.82422Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span
                                                    type="button"
                                                    className="nav-item "
                                                    data-bs-dismiss="offcanvas"
                                                >
                                                    Inquires
                                                </span>
                                            </Link>
                                        </li>

                                        <li className="">
                                            <div
                                                className="nav-line cp {{ collect(['resto/raw_mat_category', 'resto/raw_mat_item_group', 'resto/raw_mat_items', 'resto/suppliers', 'resto/units', 'resto/kitchen', 'resto/tax_rate', 'resto/purchase', 'resto/issue'])->contains(Request::path()) ? 'active_sub' : '' }}"
                                                href="#"
                                            >
                                                <svg
                                                    width="24"
                                                    className="icon_svg"
                                                    height="25"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5 11.8242H9C10.1 11.8242 11 10.9242 11 9.82422V5.82422C11 4.72422 10.1 3.82422 9 3.82422H5C3.9 3.82422 3 4.72422 3 5.82422V9.82422C3 10.9242 3.9 11.8242 5 11.8242Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M5 21.8242H9C10.1 21.8242 11 20.9242 11 19.8242V15.8242C11 14.7242 10.1 13.8242 9 13.8242H5C3.9 13.8242 3 14.7242 3 15.8242V19.8242C3 20.9242 3.9 21.8242 5 21.8242Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M13 5.82422V9.82422C13 10.9242 13.9 11.8242 15 11.8242H19C20.1 11.8242 21 10.9242 21 9.82422V5.82422C21 4.72422 20.1 3.82422 19 3.82422H15C13.9 3.82422 13 4.72422 13 5.82422Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M15 21.8242H19C20.1 21.8242 21 20.9242 21 19.8242V15.8242C21 14.7242 20.1 13.8242 19 13.8242H15C13.9 13.8242 13 14.7242 13 15.8242V19.8242C13 20.9242 13.9 21.8242 15 21.8242Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span className="nav-item">
                                                    Masters
                                                </span>
                                                <span className="material-icons-round cp downarrow">
                                                    chevron_right
                                                </span>
                                            </div>
                                            <div className="submenu_box p-3 y_scrolling">
                                                <ul className="sub-menu-list px-2  row">
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/floor' ? 'active' : ''}`}
                                                            to="/floor"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/floor',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                {' '}
                                                                Floor
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/section' ? 'active' : ''}`}
                                                            to="/section"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/section',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                Section
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/amenity' ? 'active' : ''}`}
                                                            to="/amenity"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/amenity',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                Amenity
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/rooms_category' ? 'active' : ''}`}
                                                            to="/rooms_category"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/rooms_category',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                Rooms Category
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/rooms' ? 'active' : ''}`}
                                                            to="/rooms"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/rooms',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                Rooms
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/rooms_plan' ? 'active' : ''}`}
                                                            to="/rooms_plan"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/rooms_plan',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                Rooms Plan
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/room_view' ? 'active' : ''}`}
                                                            to="/room_view"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/room_view',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                Rooms View
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className={`nav-sub-box nav-line cp ${activeLink === '/inquiry_type' ? 'active' : ''}`}
                                                            to="/inquiry_type"
                                                            onClick={() =>
                                                                handleLinkClick(
                                                                    '/inquiry_type',
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                type="button"
                                                                className="nav-item"
                                                                data-bs-dismiss="offcanvas"
                                                            >
                                                                {' '}
                                                                Inquiry
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div
                                                className="nav-line cp {{ collect(['resto/raw_mat_category', 'resto/raw_mat_item_group', 'resto/raw_mat_items', 'resto/suppliers', 'resto/units', 'resto/kitchen', 'resto/tax_rate', 'resto/purchase', 'resto/issue'])->contains(Request::path()) ? 'active_sub' : '' }}"
                                                href="#"
                                            >
                                                <svg
                                                    width="24"
                                                    className="icon_svg"
                                                    height="25"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M19.4997 12.8242C19.4997 12.5942 19.4897 12.3742 19.4697 12.1442L21.3297 10.7342C21.7297 10.4342 21.8397 9.87422 21.5897 9.43422L19.7197 6.20422C19.4697 5.76422 18.9297 5.58422 18.4697 5.78422L16.3197 6.69422C15.9497 6.43422 15.5597 6.20422 15.1497 6.01422L14.8597 3.70422C14.7997 3.20422 14.3697 2.82422 13.8697 2.82422H10.1397C9.62967 2.82422 9.19967 3.20422 9.13967 3.70422L8.84967 6.01422C8.43967 6.20422 8.04967 6.43422 7.67967 6.69422L5.52967 5.78422C5.06967 5.58422 4.52967 5.76422 4.27967 6.20422L2.40967 9.44422C2.15967 9.88422 2.26967 10.4342 2.66967 10.7442L4.52967 12.1542C4.50967 12.3742 4.49967 12.5942 4.49967 12.8242C4.49967 13.0542 4.50967 13.2742 4.52967 13.5042L2.66967 14.9142C2.26967 15.2142 2.15967 15.7742 2.40967 16.2142L4.27967 19.4442C4.52967 19.8842 5.06967 20.0642 5.52967 19.8642L7.67967 18.9542C8.04967 19.2142 8.43967 19.4442 8.84967 19.6342L9.13967 21.9442C9.19967 22.4442 9.62967 22.8242 10.1297 22.8242H13.8597C14.3597 22.8242 14.7897 22.4442 14.8497 21.9442L15.1397 19.6342C15.5497 19.4442 15.9397 19.2142 16.3097 18.9542L18.4597 19.8642C18.9197 20.0642 19.4597 19.8842 19.7097 19.4442L21.5797 16.2142C21.8297 15.7742 21.7197 15.2242 21.3197 14.9142L19.4597 13.5042C19.4897 13.2742 19.4997 13.0542 19.4997 12.8242ZM12.0397 16.3242C10.1097 16.3242 8.53967 14.7542 8.53967 12.8242C8.53967 10.8942 10.1097 9.32422 12.0397 9.32422C13.9697 9.32422 15.5397 10.8942 15.5397 12.8242C15.5397 14.7542 13.9697 16.3242 12.0397 16.3242Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span className="nav-item">
                                                    Settings
                                                </span>
                                                <span className="material-icons-round cp downarrow">
                                                    chevron_right
                                                </span>
                                            </div>
                                            <div className="submenu_box p-3 y_scrolling">
                                                <ul className="sub-menu-list px-2  row">
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_item_group') ? 'active-icon' : '' }}"
                                                            href="{{ url('/resto/raw_mat_item_group') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M11 22H15V18H11V22ZM11 27H15V23H11V27ZM11 17H15V13H11V17ZM16 22H29V18H16V22ZM16 27H29V23H16V27ZM16 13V17H29V13H16Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                {' '}
                                                                Raw Mat. Item
                                                                Group
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_items') ? 'active-icon' : '' }}"
                                                            to="{{ url('/resto/raw_mat_items') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M17.75 10.25H20.75V11.375H17.75V10.25Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M23.7473 19.875C22.8102 19.875 22.8102 18.875 21.8731 18.875C20.936 18.875 20.9359 19.875 19.9988 19.875C19.0617 19.875 19.0614 18.875 18.124 18.875C17.1866 18.875 17.1872 19.875 16.2503 19.875C15.3126 19.875 15.3126 18.875 14.3749 18.875C13.4366 18.875 13.4366 19.875 12.4982 19.875C11.5599 19.875 11.5599 18.875 10.6216 18.875V30.5H25.2466V18.9423C24.6636 19.1643 24.5384 19.875 23.7473 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.4982 19.875C26.7059 19.875 26.5807 19.164 25.9966 18.9421V30.5H29.3749V18.875C28.4365 18.875 28.4365 19.875 27.4982 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M16.2504 19.1249C16.3719 19.1249 16.4119 19.1055 16.6397 18.8622C16.8134 18.6331 17.0379 18.4474 17.2954 18.3195C17.5529 18.1916 17.8365 18.125 18.1241 18.125C18.4116 18.125 18.6952 18.1915 18.9527 18.3194C19.2103 18.4472 19.4347 18.6329 19.6085 18.862C19.8348 19.1035 19.8766 19.1245 19.9962 19.1247C19.8636 18.3517 19.903 17.5589 20.1117 16.8028C20.3633 15.7681 20.9411 14.8419 21.7597 14.1609C21.3847 13.7426 20.9076 13.4288 20.375 13.25V12.125H18.125V13.25C17.4698 13.4684 16.8999 13.8874 16.4961 14.4477C16.0923 15.008 15.875 15.6811 15.875 16.3717V18.8777C16.0783 19.0935 16.1262 19.1249 16.2504 19.1249Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.107 18.8618C27.326 19.0955 27.3699 19.1249 27.4981 19.1249C27.6263 19.1249 27.6706 19.0955 27.8899 18.8617C27.9666 18.7799 28.0559 18.6868 28.1596 18.5946C28.4858 16.9237 27.9042 15.3968 26.7805 15.0958C26.3765 14.9973 25.9503 15.05 25.5824 15.244C25.6436 14.862 25.8292 14.511 26.1105 14.2455C26.2526 14.1379 26.416 14.062 26.5898 14.0228C26.7637 13.9837 26.9439 13.9822 27.1183 14.0185C27.1675 14.026 27.2178 14.0237 27.2661 14.0117C27.3144 13.9996 27.3598 13.9781 27.3997 13.9483C27.4395 13.9185 27.4731 13.881 27.4984 13.8382C27.5236 13.7953 27.5401 13.7478 27.5468 13.6984C27.5536 13.6491 27.5504 13.5989 27.5375 13.5509C27.5247 13.5028 27.5023 13.4577 27.4719 13.4183C27.4414 13.379 27.4034 13.3461 27.3601 13.3215C27.3168 13.297 27.269 13.2813 27.2196 13.2754C26.943 13.2241 26.6586 13.2323 26.3854 13.2995C26.1122 13.3668 25.8565 13.4915 25.6353 13.6654C25.2285 14.031 24.954 14.5208 24.8546 15.0585C24.6328 14.7009 24.2868 14.4378 23.8829 14.3196C22.6826 13.9979 21.3185 15.1968 20.836 16.9971C20.6958 17.5112 20.643 18.0453 20.6798 18.577C21.0058 18.2803 21.4324 18.1187 21.8731 18.125C22.16 18.1285 22.4424 18.1965 22.6994 18.3242C22.9563 18.4518 23.1812 18.6357 23.3573 18.8622C23.5855 19.1055 23.6254 19.1249 23.7473 19.1249C23.8693 19.1249 23.9092 19.1055 24.1373 18.8622C24.3112 18.6331 24.5357 18.4474 24.7933 18.3195C25.0508 18.1916 25.3345 18.1251 25.622 18.125C25.9096 18.125 26.1933 18.1915 26.4509 18.3193C26.7085 18.4471 26.9331 18.6328 27.107 18.8618Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M12.1069 18.8618C12.3259 19.0954 12.3699 19.1249 12.4981 19.1249C12.6262 19.1249 12.6706 19.0954 12.8899 18.8616C13.0662 18.6352 13.2913 18.4514 13.5483 18.3238C13.8054 18.1963 14.0879 18.1283 14.3749 18.125C14.6335 18.1219 14.8896 18.1758 15.1249 18.283V16.3717C15.1272 15.7126 15.2913 15.0642 15.6028 14.4834C14.3628 11.3142 12.8197 9.23724 11.7386 9.52689C10.3985 9.88599 10.2574 13.7452 11.3752 18.2846C11.655 18.4265 11.9037 18.6227 12.1069 18.8618ZM14.1848 14.5793C14.2791 14.6111 14.3567 14.6791 14.4008 14.7683C14.4449 14.8574 14.4518 14.9604 14.4199 15.0546L13.5531 17.616C13.5378 17.6632 13.5132 17.7069 13.4809 17.7445C13.4485 17.7821 13.409 17.8129 13.3647 17.8351C13.3204 17.8573 13.2721 17.8706 13.2226 17.874C13.1731 17.8775 13.1234 17.871 13.0764 17.8552C13.0295 17.8393 12.9861 17.8142 12.9488 17.7815C12.9116 17.7487 12.8812 17.7089 12.8595 17.6643C12.8378 17.6197 12.8251 17.5713 12.8222 17.5217C12.8193 17.4722 12.8263 17.4226 12.8427 17.3758L13.7095 14.8143C13.7414 14.7202 13.8094 14.6425 13.8985 14.5985C13.9877 14.5544 14.0906 14.5475 14.1848 14.5793ZM11.9693 14.4909L12.8355 11.9294C12.8682 11.8363 12.9363 11.7597 13.025 11.7165C13.1138 11.6732 13.216 11.6667 13.3095 11.6983C13.403 11.7299 13.4803 11.7971 13.5246 11.8854C13.5689 11.9736 13.5765 12.0758 13.546 12.1697L12.6799 14.7312C12.6645 14.7784 12.64 14.822 12.6076 14.8596C12.5753 14.8972 12.5358 14.928 12.4915 14.9503C12.4471 14.9725 12.3988 14.9857 12.3494 14.9892C12.2999 14.9926 12.2502 14.9862 12.2032 14.9703C12.1562 14.9544 12.1129 14.9294 12.0756 14.8966C12.0384 14.8639 12.008 14.824 11.9863 14.7794C11.9645 14.7349 11.9519 14.6864 11.949 14.6369C11.9461 14.5874 11.9529 14.5377 11.9693 14.4909Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                Raw Material
                                                                Items
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="">
                                            <Link
                                                className={`nav-line cp ${activeLink === '/user_list' ? 'active' : ''}`}
                                                to="/user_list"
                                                onClick={() =>
                                                    handleLinkClick(
                                                        '/user_list',
                                                    )
                                                }
                                            >
                                                <svg
                                                    width="24"
                                                    height="25"
                                                    className="icon_svg"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16.5 12.8242C17.88 12.8242 18.99 11.7042 18.99 10.3242C18.99 8.94422 17.88 7.82422 16.5 7.82422C15.12 7.82422 14 8.94422 14 10.3242C14 11.7042 15.12 12.8242 16.5 12.8242ZM9 11.8242C10.66 11.8242 11.99 10.4842 11.99 8.82422C11.99 7.16422 10.66 5.82422 9 5.82422C7.34 5.82422 6 7.16422 6 8.82422C6 10.4842 7.34 11.8242 9 11.8242ZM16.5 14.8242C14.67 14.8242 11 15.7442 11 17.5742V18.8242C11 19.3742 11.45 19.8242 12 19.8242H21C21.55 19.8242 22 19.3742 22 18.8242V17.5742C22 15.7442 18.33 14.8242 16.5 14.8242ZM9 13.8242C6.67 13.8242 2 14.9942 2 17.3242V18.8242C2 19.3742 2.45 19.8242 3 19.8242H9V17.5742C9 16.7242 9.33 15.2342 11.37 14.1042C10.5 13.9242 9.66 13.8242 9 13.8242Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span
                                                    type="button"
                                                    className="nav-item"
                                                    data-bs-dismiss="offcanvas"
                                                >
                                                    User Management
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <div
                                                className="nav-line cp {{ collect(['resto/raw_mat_category', 'resto/raw_mat_item_group', 'resto/raw_mat_items', 'resto/suppliers', 'resto/units', 'resto/kitchen', 'resto/tax_rate', 'resto/purchase', 'resto/issue'])->contains(Request::path()) ? 'active_sub' : '' }}"
                                                href="#"
                                            >
                                                <svg
                                                    width="24"
                                                    height="25"
                                                    className="icon_svg"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M19 3.82422H5C3.9 3.82422 3 4.72422 3 5.82422V19.8242C3 20.9242 3.9 21.8242 5 21.8242H19C20.1 21.8242 21 20.9242 21 19.8242V5.82422C21 4.72422 20.1 3.82422 19 3.82422ZM8 17.8242C7.45 17.8242 7 17.3742 7 16.8242V11.8242C7 11.2742 7.45 10.8242 8 10.8242C8.55 10.8242 9 11.2742 9 11.8242V16.8242C9 17.3742 8.55 17.8242 8 17.8242ZM12 17.8242C11.45 17.8242 11 17.3742 11 16.8242V8.82422C11 8.27422 11.45 7.82422 12 7.82422C12.55 7.82422 13 8.27422 13 8.82422V16.8242C13 17.3742 12.55 17.8242 12 17.8242ZM16 17.8242C15.45 17.8242 15 17.3742 15 16.8242V14.8242C15 14.2742 15.45 13.8242 16 13.8242C16.55 13.8242 17 14.2742 17 14.8242V16.8242C17 17.3742 16.55 17.8242 16 17.8242Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span className="nav-item">
                                                    Reports
                                                </span>
                                                <span className="material-icons-round cp downarrow">
                                                    chevron_right
                                                </span>
                                            </div>
                                            <div className="submenu_box p-3 y_scrolling">
                                                <ul className="sub-menu-list px-2  row">
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_item_group') ? 'active-icon' : '' }}"
                                                            to="{{ url('/resto/raw_mat_item_group') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M11 22H15V18H11V22ZM11 27H15V23H11V27ZM11 17H15V13H11V17ZM16 22H29V18H16V22ZM16 27H29V23H16V27ZM16 13V17H29V13H16Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                {' '}
                                                                Raw Mat. Item
                                                                Group
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_items') ? 'active-icon' : '' }}"
                                                            href="{{ url('/resto/raw_mat_items') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M17.75 10.25H20.75V11.375H17.75V10.25Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M23.7473 19.875C22.8102 19.875 22.8102 18.875 21.8731 18.875C20.936 18.875 20.9359 19.875 19.9988 19.875C19.0617 19.875 19.0614 18.875 18.124 18.875C17.1866 18.875 17.1872 19.875 16.2503 19.875C15.3126 19.875 15.3126 18.875 14.3749 18.875C13.4366 18.875 13.4366 19.875 12.4982 19.875C11.5599 19.875 11.5599 18.875 10.6216 18.875V30.5H25.2466V18.9423C24.6636 19.1643 24.5384 19.875 23.7473 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.4982 19.875C26.7059 19.875 26.5807 19.164 25.9966 18.9421V30.5H29.3749V18.875C28.4365 18.875 28.4365 19.875 27.4982 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M16.2504 19.1249C16.3719 19.1249 16.4119 19.1055 16.6397 18.8622C16.8134 18.6331 17.0379 18.4474 17.2954 18.3195C17.5529 18.1916 17.8365 18.125 18.1241 18.125C18.4116 18.125 18.6952 18.1915 18.9527 18.3194C19.2103 18.4472 19.4347 18.6329 19.6085 18.862C19.8348 19.1035 19.8766 19.1245 19.9962 19.1247C19.8636 18.3517 19.903 17.5589 20.1117 16.8028C20.3633 15.7681 20.9411 14.8419 21.7597 14.1609C21.3847 13.7426 20.9076 13.4288 20.375 13.25V12.125H18.125V13.25C17.4698 13.4684 16.8999 13.8874 16.4961 14.4477C16.0923 15.008 15.875 15.6811 15.875 16.3717V18.8777C16.0783 19.0935 16.1262 19.1249 16.2504 19.1249Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.107 18.8618C27.326 19.0955 27.3699 19.1249 27.4981 19.1249C27.6263 19.1249 27.6706 19.0955 27.8899 18.8617C27.9666 18.7799 28.0559 18.6868 28.1596 18.5946C28.4858 16.9237 27.9042 15.3968 26.7805 15.0958C26.3765 14.9973 25.9503 15.05 25.5824 15.244C25.6436 14.862 25.8292 14.511 26.1105 14.2455C26.2526 14.1379 26.416 14.062 26.5898 14.0228C26.7637 13.9837 26.9439 13.9822 27.1183 14.0185C27.1675 14.026 27.2178 14.0237 27.2661 14.0117C27.3144 13.9996 27.3598 13.9781 27.3997 13.9483C27.4395 13.9185 27.4731 13.881 27.4984 13.8382C27.5236 13.7953 27.5401 13.7478 27.5468 13.6984C27.5536 13.6491 27.5504 13.5989 27.5375 13.5509C27.5247 13.5028 27.5023 13.4577 27.4719 13.4183C27.4414 13.379 27.4034 13.3461 27.3601 13.3215C27.3168 13.297 27.269 13.2813 27.2196 13.2754C26.943 13.2241 26.6586 13.2323 26.3854 13.2995C26.1122 13.3668 25.8565 13.4915 25.6353 13.6654C25.2285 14.031 24.954 14.5208 24.8546 15.0585C24.6328 14.7009 24.2868 14.4378 23.8829 14.3196C22.6826 13.9979 21.3185 15.1968 20.836 16.9971C20.6958 17.5112 20.643 18.0453 20.6798 18.577C21.0058 18.2803 21.4324 18.1187 21.8731 18.125C22.16 18.1285 22.4424 18.1965 22.6994 18.3242C22.9563 18.4518 23.1812 18.6357 23.3573 18.8622C23.5855 19.1055 23.6254 19.1249 23.7473 19.1249C23.8693 19.1249 23.9092 19.1055 24.1373 18.8622C24.3112 18.6331 24.5357 18.4474 24.7933 18.3195C25.0508 18.1916 25.3345 18.1251 25.622 18.125C25.9096 18.125 26.1933 18.1915 26.4509 18.3193C26.7085 18.4471 26.9331 18.6328 27.107 18.8618Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M12.1069 18.8618C12.3259 19.0954 12.3699 19.1249 12.4981 19.1249C12.6262 19.1249 12.6706 19.0954 12.8899 18.8616C13.0662 18.6352 13.2913 18.4514 13.5483 18.3238C13.8054 18.1963 14.0879 18.1283 14.3749 18.125C14.6335 18.1219 14.8896 18.1758 15.1249 18.283V16.3717C15.1272 15.7126 15.2913 15.0642 15.6028 14.4834C14.3628 11.3142 12.8197 9.23724 11.7386 9.52689C10.3985 9.88599 10.2574 13.7452 11.3752 18.2846C11.655 18.4265 11.9037 18.6227 12.1069 18.8618ZM14.1848 14.5793C14.2791 14.6111 14.3567 14.6791 14.4008 14.7683C14.4449 14.8574 14.4518 14.9604 14.4199 15.0546L13.5531 17.616C13.5378 17.6632 13.5132 17.7069 13.4809 17.7445C13.4485 17.7821 13.409 17.8129 13.3647 17.8351C13.3204 17.8573 13.2721 17.8706 13.2226 17.874C13.1731 17.8775 13.1234 17.871 13.0764 17.8552C13.0295 17.8393 12.9861 17.8142 12.9488 17.7815C12.9116 17.7487 12.8812 17.7089 12.8595 17.6643C12.8378 17.6197 12.8251 17.5713 12.8222 17.5217C12.8193 17.4722 12.8263 17.4226 12.8427 17.3758L13.7095 14.8143C13.7414 14.7202 13.8094 14.6425 13.8985 14.5985C13.9877 14.5544 14.0906 14.5475 14.1848 14.5793ZM11.9693 14.4909L12.8355 11.9294C12.8682 11.8363 12.9363 11.7597 13.025 11.7165C13.1138 11.6732 13.216 11.6667 13.3095 11.6983C13.403 11.7299 13.4803 11.7971 13.5246 11.8854C13.5689 11.9736 13.5765 12.0758 13.546 12.1697L12.6799 14.7312C12.6645 14.7784 12.64 14.822 12.6076 14.8596C12.5753 14.8972 12.5358 14.928 12.4915 14.9503C12.4471 14.9725 12.3988 14.9857 12.3494 14.9892C12.2999 14.9926 12.2502 14.9862 12.2032 14.9703C12.1562 14.9544 12.1129 14.9294 12.0756 14.8966C12.0384 14.8639 12.008 14.824 11.9863 14.7794C11.9645 14.7349 11.9519 14.6864 11.949 14.6369C11.9461 14.5874 11.9529 14.5377 11.9693 14.4909Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                Raw Material
                                                                Items
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="">
                                            <div
                                                className="nav-line cp {{ collect(['resto/raw_mat_category', 'resto/raw_mat_item_group', 'resto/raw_mat_items', 'resto/suppliers', 'resto/units', 'resto/kitchen', 'resto/tax_rate', 'resto/purchase', 'resto/issue'])->contains(Request::path()) ? 'active_sub' : '' }}"
                                                href="#"
                                            >
                                                <svg
                                                    width="24"
                                                    height="25"
                                                    className="icon_svg"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16 11.8242H15V4.82422C15 3.16422 13.66 1.82422 12 1.82422C10.34 1.82422 9 3.16422 9 4.82422V11.8242H8C5.24 11.8242 3 14.0642 3 16.8242V21.8242C3 22.9242 3.9 23.8242 5 23.8242H19C20.1 23.8242 21 22.9242 21 21.8242V16.8242C21 14.0642 18.76 11.8242 16 11.8242ZM19 21.8242H17V18.8242C17 18.2742 16.55 17.8242 16 17.8242C15.45 17.8242 15 18.2742 15 18.8242V21.8242H13V18.8242C13 18.2742 12.55 17.8242 12 17.8242C11.45 17.8242 11 18.2742 11 18.8242V21.8242H9V18.8242C9 18.2742 8.55 17.8242 8 17.8242C7.45 17.8242 7 18.2742 7 18.8242V21.8242H5V16.8242C5 15.1742 6.35 13.8242 8 13.8242H16C17.65 13.8242 19 15.1742 19 16.8242V21.8242Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span className="nav-item">
                                                    Maintenance
                                                </span>
                                                <span className="material-icons-round cp downarrow">
                                                    chevron_right
                                                </span>
                                            </div>
                                            <div className="submenu_box p-3 y_scrolling">
                                                <ul className="sub-menu-list px-2  row">
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_item_group') ? 'active-icon' : '' }}"
                                                            to="{{ url('/resto/raw_mat_item_group') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M11 22H15V18H11V22ZM11 27H15V23H11V27ZM11 17H15V13H11V17ZM16 22H29V18H16V22ZM16 27H29V23H16V27ZM16 13V17H29V13H16Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                {' '}
                                                                Raw Mat. Item
                                                                Group
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="col-12 grid_padding">
                                                        <Link
                                                            className="nav-sub-box cp {{ Request::is('resto/raw_mat_items') ? 'active-icon' : '' }}"
                                                            href="{{ url('/resto/raw_mat_items') }}"
                                                        >
                                                            <svg
                                                                width="40"
                                                                className="icon_svg"
                                                                height="40"
                                                                viewBox="0 0 40 40"
                                                                fill="#6A6968"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M17.75 10.25H20.75V11.375H17.75V10.25Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M23.7473 19.875C22.8102 19.875 22.8102 18.875 21.8731 18.875C20.936 18.875 20.9359 19.875 19.9988 19.875C19.0617 19.875 19.0614 18.875 18.124 18.875C17.1866 18.875 17.1872 19.875 16.2503 19.875C15.3126 19.875 15.3126 18.875 14.3749 18.875C13.4366 18.875 13.4366 19.875 12.4982 19.875C11.5599 19.875 11.5599 18.875 10.6216 18.875V30.5H25.2466V18.9423C24.6636 19.1643 24.5384 19.875 23.7473 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.4982 19.875C26.7059 19.875 26.5807 19.164 25.9966 18.9421V30.5H29.3749V18.875C28.4365 18.875 28.4365 19.875 27.4982 19.875Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M16.2504 19.1249C16.3719 19.1249 16.4119 19.1055 16.6397 18.8622C16.8134 18.6331 17.0379 18.4474 17.2954 18.3195C17.5529 18.1916 17.8365 18.125 18.1241 18.125C18.4116 18.125 18.6952 18.1915 18.9527 18.3194C19.2103 18.4472 19.4347 18.6329 19.6085 18.862C19.8348 19.1035 19.8766 19.1245 19.9962 19.1247C19.8636 18.3517 19.903 17.5589 20.1117 16.8028C20.3633 15.7681 20.9411 14.8419 21.7597 14.1609C21.3847 13.7426 20.9076 13.4288 20.375 13.25V12.125H18.125V13.25C17.4698 13.4684 16.8999 13.8874 16.4961 14.4477C16.0923 15.008 15.875 15.6811 15.875 16.3717V18.8777C16.0783 19.0935 16.1262 19.1249 16.2504 19.1249Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M27.107 18.8618C27.326 19.0955 27.3699 19.1249 27.4981 19.1249C27.6263 19.1249 27.6706 19.0955 27.8899 18.8617C27.9666 18.7799 28.0559 18.6868 28.1596 18.5946C28.4858 16.9237 27.9042 15.3968 26.7805 15.0958C26.3765 14.9973 25.9503 15.05 25.5824 15.244C25.6436 14.862 25.8292 14.511 26.1105 14.2455C26.2526 14.1379 26.416 14.062 26.5898 14.0228C26.7637 13.9837 26.9439 13.9822 27.1183 14.0185C27.1675 14.026 27.2178 14.0237 27.2661 14.0117C27.3144 13.9996 27.3598 13.9781 27.3997 13.9483C27.4395 13.9185 27.4731 13.881 27.4984 13.8382C27.5236 13.7953 27.5401 13.7478 27.5468 13.6984C27.5536 13.6491 27.5504 13.5989 27.5375 13.5509C27.5247 13.5028 27.5023 13.4577 27.4719 13.4183C27.4414 13.379 27.4034 13.3461 27.3601 13.3215C27.3168 13.297 27.269 13.2813 27.2196 13.2754C26.943 13.2241 26.6586 13.2323 26.3854 13.2995C26.1122 13.3668 25.8565 13.4915 25.6353 13.6654C25.2285 14.031 24.954 14.5208 24.8546 15.0585C24.6328 14.7009 24.2868 14.4378 23.8829 14.3196C22.6826 13.9979 21.3185 15.1968 20.836 16.9971C20.6958 17.5112 20.643 18.0453 20.6798 18.577C21.0058 18.2803 21.4324 18.1187 21.8731 18.125C22.16 18.1285 22.4424 18.1965 22.6994 18.3242C22.9563 18.4518 23.1812 18.6357 23.3573 18.8622C23.5855 19.1055 23.6254 19.1249 23.7473 19.1249C23.8693 19.1249 23.9092 19.1055 24.1373 18.8622C24.3112 18.6331 24.5357 18.4474 24.7933 18.3195C25.0508 18.1916 25.3345 18.1251 25.622 18.125C25.9096 18.125 26.1933 18.1915 26.4509 18.3193C26.7085 18.4471 26.9331 18.6328 27.107 18.8618Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M12.1069 18.8618C12.3259 19.0954 12.3699 19.1249 12.4981 19.1249C12.6262 19.1249 12.6706 19.0954 12.8899 18.8616C13.0662 18.6352 13.2913 18.4514 13.5483 18.3238C13.8054 18.1963 14.0879 18.1283 14.3749 18.125C14.6335 18.1219 14.8896 18.1758 15.1249 18.283V16.3717C15.1272 15.7126 15.2913 15.0642 15.6028 14.4834C14.3628 11.3142 12.8197 9.23724 11.7386 9.52689C10.3985 9.88599 10.2574 13.7452 11.3752 18.2846C11.655 18.4265 11.9037 18.6227 12.1069 18.8618ZM14.1848 14.5793C14.2791 14.6111 14.3567 14.6791 14.4008 14.7683C14.4449 14.8574 14.4518 14.9604 14.4199 15.0546L13.5531 17.616C13.5378 17.6632 13.5132 17.7069 13.4809 17.7445C13.4485 17.7821 13.409 17.8129 13.3647 17.8351C13.3204 17.8573 13.2721 17.8706 13.2226 17.874C13.1731 17.8775 13.1234 17.871 13.0764 17.8552C13.0295 17.8393 12.9861 17.8142 12.9488 17.7815C12.9116 17.7487 12.8812 17.7089 12.8595 17.6643C12.8378 17.6197 12.8251 17.5713 12.8222 17.5217C12.8193 17.4722 12.8263 17.4226 12.8427 17.3758L13.7095 14.8143C13.7414 14.7202 13.8094 14.6425 13.8985 14.5985C13.9877 14.5544 14.0906 14.5475 14.1848 14.5793ZM11.9693 14.4909L12.8355 11.9294C12.8682 11.8363 12.9363 11.7597 13.025 11.7165C13.1138 11.6732 13.216 11.6667 13.3095 11.6983C13.403 11.7299 13.4803 11.7971 13.5246 11.8854C13.5689 11.9736 13.5765 12.0758 13.546 12.1697L12.6799 14.7312C12.6645 14.7784 12.64 14.822 12.6076 14.8596C12.5753 14.8972 12.5358 14.928 12.4915 14.9503C12.4471 14.9725 12.3988 14.9857 12.3494 14.9892C12.2999 14.9926 12.2502 14.9862 12.2032 14.9703C12.1562 14.9544 12.1129 14.9294 12.0756 14.8966C12.0384 14.8639 12.008 14.824 11.9863 14.7794C11.9645 14.7349 11.9519 14.6864 11.949 14.6369C11.9461 14.5874 11.9529 14.5377 11.9693 14.4909Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            <span className="nav-item">
                                                                Raw Material
                                                                Items
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="">
                                            <Link
                                                className="nav-line  cp {{ Request::is('resto/dashboard') ? 'active_sub' : '' }} "
                                                href="/login"
                                            >
                                                <svg
                                                    width="24"
                                                    height="25"
                                                    className="icon_svg"
                                                    viewBox="0 0 24 25"
                                                    fill="#566B7D"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.10449 5.82422H11.1045C11.6545 5.82422 12.1045 5.37422 12.1045 4.82422C12.1045 4.27422 11.6545 3.82422 11.1045 3.82422H5.10449C4.00449 3.82422 3.10449 4.72422 3.10449 5.82422V19.8242C3.10449 20.9242 4.00449 21.8242 5.10449 21.8242H11.1045C11.6545 21.8242 12.1045 21.3742 12.1045 20.8242C12.1045 20.2742 11.6545 19.8242 11.1045 19.8242H5.10449V5.82422Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M20.7545 12.4742L17.9645 9.68422C17.6445 9.36422 17.1045 9.58422 17.1045 10.0342V11.8242H10.1045C9.55449 11.8242 9.10449 12.2742 9.10449 12.8242C9.10449 13.3742 9.55449 13.8242 10.1045 13.8242H17.1045V15.6142C17.1045 16.0642 17.6445 16.2842 17.9545 15.9642L20.7445 13.1742C20.9445 12.9842 20.9445 12.6642 20.7545 12.4742Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                <span
                                                    type="button"
                                                    className="nav-item"
                                                    data-bs-dismiss="offcanvas"
                                                >
                                                    Log Out
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
        </>
    );
}

export default Navbar;
