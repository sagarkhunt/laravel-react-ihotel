import React, { useState } from 'react';
import '../../../css/AddReservation.css';
import AssignRoomMdl from './AssignRoomMdl';
function ReservationList() {
    // State to track the current view mode
    const [isGridView, setIsGridView] = useState(true);
    const [open, setOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('reservations');

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    function assignRooms() {
        setOpen(true);
    }

    // Function to toggle between views
    const toggleView = () => {
        setIsGridView(!isGridView);
    };
    return (
        <div className="container-fluid py-3 px-4">
            <div className="col-12 mt-3 pannel action-header px-3">
                <div className="row">
                    <div className="col-6 d-flex align-items-center">
                        <h6
                            className={`subtitle-1m mb-0 p-2 ${activeButton === 'reservations' ? 'btn-primary' : ''}`}
                            onClick={() => handleClick('reservations')}
                        >
                            Reservations
                            <span className="subtitle-2m btn-primary rounded-circle">
                                12
                            </span>
                        </h6>

                        <h6
                            className={`subtitle-1m mb-0 mx-3 ${activeButton === 'arrivals' ? 'btn-primary p-2' : ''}`}
                            onClick={() => handleClick('arrivals')}
                        >
                            Arrivals{' '}
                            <span className="subtitle-2m rounded-circle2">
                                21
                            </span>
                        </h6>

                        <h6
                            className={`subtitle-1m mb-0 mx-3 ${activeButton === 'departure' ? 'btn-primary p-2' : ''}`}
                            onClick={() => handleClick('departure')}
                        >
                            Departure{' '}
                            <span className="subtitle-2m rounded-circle2">
                                32
                            </span>
                        </h6>

                        <h6
                            className={`subtitle-1m mb-0 mx-3 ${activeButton === 'in-house' ? 'btn-primary p-2' : ''}`}
                            onClick={() => handleClick('in-house')}
                        >
                            In-house{' '}
                            <span className="subtitle-2m rounded-circle2">
                                34
                            </span>
                        </h6>
                    </div>
                    <div className="col-6 gap-3 action-right">
                        <div className="form-group position-relative search-container">
                            <span className="material-icons-outlined search-icon">
                                search
                            </span>
                            <input
                                type="text"
                                className="form-control search-input"
                                id="dt-serach-cstm"
                                placeholder="Search"
                                value=""
                            />
                        </div>

                        {/* <button className="subtitle-2m btn custom-border btn-secondary d-flex">
                            <span className="material-icons mx-1">
                                view_comfy
                            </span>
                            <span className="material-icons"> list </span>
                        </button> */}
                        <button
                            className="subtitle-2m btn custom-border btn-secondary d-flex"
                            onClick={toggleView}
                        >
                            <span className="material-icons mx-1">
                                {isGridView ? 'view_list' : 'view_comfy'}
                            </span>
                            {isGridView ? 'List' : 'Grid'}
                        </button>

                        <div className="dropdown">
                            <button
                                className="subtitle-2m btn custom-border btn-secondary"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Actions
                                <span
                                    className="material-icons-outlined primary-icon"
                                    style={{ color: '#0863b5' }}
                                >
                                    keyboard_arrow_down
                                </span>
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
                            </ul>
                        </div>
                        <button
                            className="btn btn-secondary d-flex"
                            data-bs-toggle="modal"
                            data-bs-target="#Assigns_rooms"
                            onClick={assignRooms}
                        >
                            <div>Print GR</div>
                        </button>
                    </div>
                </div>
            </div>
            {isGridView ? (
                <div className="col-12 p-3 container-page">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th scope="col" className="th-custom" width="">
                                    Guest Name
                                </th>
                                <th scope="col" className="th-custom" width="">
                                    Res. No
                                </th>
                                <th scope="col" className="th-custom" width="">
                                    Booking Date
                                </th>
                                <th scope="col" className="th-custom" width="">
                                    Arrival
                                </th>
                                <th scope="col" className="th-custom" width="">
                                    Departure
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    width="240px"
                                >
                                    Room Detail
                                </th>
                                <th scope="col" className="th-custom" width="">
                                    Res. Type
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    width=""
                                    style={{ textAlign: 'right' }}
                                >
                                    Total(Rs)
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    width=""
                                    style={{ textAlign: 'right' }}
                                >
                                    Paid(Rs)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="td-custom subtitle-1m">
                                    <div className="mt-1">Alex Apolo</div>
                                    <div className="icons-container d-flex align-items-center mt-1">
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                man
                                            </span>
                                            <span className="align-items-center">
                                                2
                                            </span>
                                        </div>
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                boy
                                            </span>
                                            <span className="align-items-center">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-custom body-2">RS1234</td>
                                <td className="td-custom body-2">12/09/2024</td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">12/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">14/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">
                                        Duplex Room/American Plan (CP)
                                    </div>
                                    <div className="mt-1">
                                        <p className="assign mt-1 mb-0">
                                            Assign Room
                                        </p>
                                    </div>
                                </td>
                                <td className="td-custom body-2" width="8%">
                                    Confirm Booking
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    2,000.00
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    1,000.00
                                </td>
                            </tr>
                            <tr>
                                <td className="td-custom subtitle-1m">
                                    <div className="mt-1">Alex Apolo</div>
                                    <div className="icons-container d-flex align-items-center mt-1">
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                man
                                            </span>
                                            <span className="align-items-center">
                                                2
                                            </span>
                                        </div>
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                boy
                                            </span>
                                            <span className="align-items-center">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-custom body-2">RS1234</td>
                                <td className="td-custom body-2">12/09/2024</td>
                                <td className="td-custom body-2 Arrival">
                                    <div className="mt-1">12/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">14/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">
                                        Duplex Room/American Plan (CP)
                                    </div>
                                    <div className="mt-1">
                                        <p className="assign mt-1 mb-0">
                                            Assign Room
                                        </p>
                                    </div>
                                </td>
                                <td className="td-custom body-2" width="8%">
                                    Confirm Booking
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    2,000.00
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    1,000.00
                                </td>
                            </tr>
                            <tr>
                                <td className="td-custom subtitle-1m">
                                    <div className="mt-1">Alex Apolo</div>
                                    <div className="icons-container d-flex align-items-center mt-1">
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                man
                                            </span>
                                            <span className="align-items-center">
                                                2
                                            </span>
                                        </div>
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                boy
                                            </span>
                                            <span className="align-items-center">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-custom body-2">RS1234</td>
                                <td className="td-custom body-2">12/09/2024</td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">12/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">14/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">
                                        Duplex Room/American Plan (CP)
                                    </div>
                                    <div className="mt-1">
                                        <p className="assign mt-1 mb-0">
                                            Assign Room
                                        </p>
                                    </div>
                                </td>
                                <td className="td-custom body-2" width="8%">
                                    Confirm Booking
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    2,000.00
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    1,000.00
                                </td>
                            </tr>
                            <tr>
                                <td className="td-custom subtitle-1m">
                                    <div className="mt-1">Alex Apolo</div>
                                    <div className="icons-container d-flex align-items-center mt-1">
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                man
                                            </span>
                                            <span className="align-items-center">
                                                2
                                            </span>
                                        </div>
                                        <div className="icon-item d-flex align-items-center">
                                            <span className="material-icons-outlined align-items-center icon">
                                                boy
                                            </span>
                                            <span className="align-items-center">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-custom body-2">RS1234</td>
                                <td className="td-custom body-2">12/09/2024</td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">12/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">14/09/2024</div>
                                    <div className="mt-1">11:00 AM</div>
                                </td>
                                <td className="td-custom body-2">
                                    <div className="mt-1">
                                        Duplex Room/American Plan (CP)
                                    </div>
                                    <div className="mt-1">
                                        <p className="assign mt-1 mb-0">
                                            Assign Room
                                        </p>
                                    </div>
                                </td>
                                <td className="td-custom body-2" width="8%">
                                    Confirm Booking
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    2,000.00
                                </td>
                                <td
                                    className="td-custom body-2"
                                    style={{ textAlign: 'right' }}
                                >
                                    1,000.00
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="col-12 p-3 container-page">
                    <div className="row">
                        <div className="col-box">
                            <div className="card-box">
                                <div className="card-header cardheader">
                                    <div>
                                        <h5 className="subtitle-1m mb-0">
                                            Mr. Rohit Patel
                                        </h5>
                                        <p className="caption-1 mb-0">RS1738</p>
                                    </div>
                                    <span className="material-icons-outlined">
                                        more_vert
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="row mb-3 row13">
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center"
                                            style={{
                                                backgroundColor: '#dee7f1',
                                                padding: '10px',
                                            }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                2
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                Nights
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <p className="subtitle-2m mb-0 p-1">
                                                Booking Date
                                            </p>
                                            <p className="body-2 mt-0 p-1">
                                                12/10/2024
                                            </p>
                                        </div>
                                        <div className="col-6 d-flex align-items-center mb-3 justify-content-end">
                                            <div>
                                                <span className="material-icons-outlined align-items-center">
                                                    man
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                            <div className="boy">
                                                <span className="material-icons-outlined align-items-center">
                                                    boy
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container-box mb-3">
                                        <p className="subtitle-2m">
                                            Room/Rate Type
                                        </p>
                                        <p className="subtitle-2m">
                                            Confirm Booking
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">
                                            Duplex Room/American
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box mb-3">
                                        <p className="body-2">
                                            Twin Room/American Plan
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Total</p>
                                        <p className="subtitle-2m">
                                            ₹ 1,000.00
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Paid</p>
                                        <p className="subtitle-2m">₹ 0.00</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="red">Balance</p>
                                        <p className="darkred">₹ 1,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-box">
                            <div className="card-box">
                                <div className="card-header cardheader">
                                    <div>
                                        <h5 className="subtitle-1m mb-0">
                                            Mr. Rohit Patel
                                        </h5>
                                        <p className="caption-1 mb-0">RS1738</p>
                                    </div>
                                    <span className="material-icons-outlined">
                                        more_vert
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="row mb-3 row13">
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center"
                                            style={{
                                                backgroundColor: '#dee7f1',
                                                padding: '10px',
                                            }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                2
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                Nights
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <p className="subtitle-2m mb-0 p-1">
                                                Booking Date
                                            </p>
                                            <p className="body-2 mt-0 p-1">
                                                12/10/2024
                                            </p>
                                        </div>
                                        <div className="col-6 d-flex align-items-center mb-3 justify-content-end">
                                            <div>
                                                <span className="material-icons-outlined align-items-center">
                                                    man
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                            <div className="boy">
                                                <span className="material-icons-outlined align-items-center">
                                                    boy
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container-box mb-3">
                                        <p className="subtitle-2m">
                                            Room/Rate Type
                                        </p>
                                        <p className="subtitle-2m">
                                            Confirm Booking
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">
                                            Duplex Room/American
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box mb-3">
                                        <p className="body-2">
                                            Twin Room/American Plan
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Total</p>
                                        <p className="subtitle-2m">
                                            ₹ 1,000.00
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Paid</p>
                                        <p className="subtitle-2m">₹ 0.00</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="red">Balance</p>
                                        <p className="darkred">₹ 1,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-box">
                            <div className="card-box">
                                <div className="card-header cardheader">
                                    <div>
                                        <h5 className="subtitle-1m mb-0">
                                            Mr. Rohit Patel
                                        </h5>
                                        <p className="caption-1 mb-0">RS1738</p>
                                    </div>
                                    <span className="material-icons-outlined">
                                        more_vert
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="row mb-3 row13">
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center"
                                            style={{
                                                backgroundColor: '#dee7f1',
                                                padding: '10px',
                                            }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                2
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                Nights
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <p className="subtitle-2m mb-0 p-1">
                                                Booking Date
                                            </p>
                                            <p className="body-2 mt-0 p-1">
                                                12/10/2024
                                            </p>
                                        </div>
                                        <div className="col-6 d-flex align-items-center mb-3 justify-content-end">
                                            <div>
                                                <span className="material-icons-outlined align-items-center">
                                                    man
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                            <div className="boy">
                                                <span className="material-icons-outlined align-items-center">
                                                    boy
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container-box mb-3">
                                        <p className="subtitle-2m">
                                            Room/Rate Type
                                        </p>
                                        <p className="subtitle-2m">
                                            Confirm Booking
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">
                                            Duplex Room/American
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box mb-3">
                                        <p className="body-2">
                                            Twin Room/American Plan
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Total</p>
                                        <p className="subtitle-2m">
                                            ₹ 1,000.00
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Paid</p>
                                        <p className="subtitle-2m">₹ 0.00</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="red">Balance</p>
                                        <p className="darkred">₹ 1,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-box">
                            <div className="card-box">
                                <div className="card-header cardheader">
                                    <div>
                                        <h5 className="subtitle-1m mb-0">
                                            Mr. Rohit Patel
                                        </h5>
                                        <p className="caption-1 mb-0">RS1738</p>
                                    </div>
                                    <span className="material-icons-outlined">
                                        more_vert
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="row mb-3 row13">
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center"
                                            style={{
                                                backgroundColor: '#dee7f1',
                                                padding: '10px',
                                            }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                2
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                Nights
                                            </p>
                                        </div>
                                        <div
                                            className="col-4 d-flex flex-column justify-content-center surface-l"
                                            style={{ padding: '10px' }}
                                        >
                                            <p className="subtitle-2m text-center mb-0">
                                                10/12/2024
                                            </p>
                                            <p className="caption-1 text-center mb-0">
                                                10:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <p className="subtitle-2m mb-0 p-1">
                                                Booking Date
                                            </p>
                                            <p className="body-2 mt-0 p-1">
                                                12/10/2024
                                            </p>
                                        </div>
                                        <div className="col-6 d-flex align-items-center mb-3 justify-content-end">
                                            <div>
                                                <span className="material-icons-outlined align-items-center">
                                                    man
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                            <div className="boy">
                                                <span className="material-icons-outlined align-items-center">
                                                    boy
                                                </span>
                                                <span className="align-items-center">
                                                    2
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container-box mb-3">
                                        <p className="subtitle-2m">
                                            Room/Rate Type
                                        </p>
                                        <p className="subtitle-2m">
                                            Confirm Booking
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">
                                            Duplex Room/American
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box mb-3">
                                        <p className="body-2">
                                            Twin Room/American Plan
                                        </p>
                                        <p className="assign">Assign Room</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Total</p>
                                        <p className="subtitle-2m">
                                            ₹ 1,000.00
                                        </p>
                                    </div>
                                    <div className="container-box">
                                        <p className="body-2">Paid</p>
                                        <p className="subtitle-2m">₹ 0.00</p>
                                    </div>
                                    <div className="container-box">
                                        <p className="red">Balance</p>
                                        <p className="darkred">₹ 1,000.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {open && <AssignRoomMdl open={open} setOpen={setOpen} />}
        </div>
    );
}

export default ReservationList;
