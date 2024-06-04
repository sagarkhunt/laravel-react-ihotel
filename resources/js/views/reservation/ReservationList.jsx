import React, { useState } from 'react';
import '../../../css/AddReservation.css';
import AssignRoomMdl from './componet/AssignRoomMdl';
import BookingCard from './componet/BookingCard';
function ReservationList() {
    const [isGridView, setIsGridView] = useState(true);
    const [open, setOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('reservations');

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    function assignRooms() {
        setOpen(true);
    }
    const toggleView = () => {
        setIsGridView(!isGridView);
    };
    const data = [
        {
            guestName: 'Alex Apolo',
            resNo: 'RS1234',
            bookingDate: '12/09/2024',
            arrivalDate: '12/09/2024',
            arrivalTime: '11:00 AM',
            departureDate: '14/09/2024',
            departureTime: '11:00 AM',
            roomDetail: 'Duplex Room/American Plan (CP)',
            resType: 'Confirm Booking',
            total: '2,000.00',
            paid: '1,000.00',
            adults: 2,
            children: 1,
        },
        {
            guestName: 'Alex Apolo',
            resNo: 'RS1234',
            bookingDate: '12/09/2024',
            arrivalDate: '12/09/2024',
            arrivalTime: '11:00 AM',
            departureDate: '14/09/2024',
            departureTime: '11:00 AM',
            roomDetail: 'Duplex Room/American Plan (CP)',
            resType: 'Confirm Booking',
            total: '2,000.00',
            paid: '1,000.00',
            adults: 2,
            children: 1,
        },
        {
            guestName: 'Alex Apolo',
            resNo: 'RS1234',
            bookingDate: '12/09/2024',
            arrivalDate: '12/09/2024',
            arrivalTime: '11:00 AM',
            departureDate: '14/09/2024',
            departureTime: '11:00 AM',
            roomDetail: 'Duplex Room/American Plan (CP)',
            resType: 'Confirm Booking',
            total: '2,000.00',
            paid: '1,000.00',
            adults: 2,
            children: 1,
        },
    ];

    const bookings = [
        {
            name: 'Mr. Rohit Patel',
            id: 'RS1738',
            checkInDate: '10/12/2024',
            checkInTime: '10:00 PM',
            nights: 2,
            bookingDate: '12/10/2024',
            adults: 2,
            children: 2,
            roomTypes: [
                { type: 'Duplex Room/American', action: 'Assign Room' },
                { type: 'Twin Room/American Plan', action: 'Assign Room' },
            ],
            total: '₹ 1,000.00',
            paid: '₹ 0.00',
            balance: '₹ 1,000.00',
        },
        {
            name: 'Mr. Rohit Patel',
            id: 'RS1738',
            checkInDate: '10/12/2024',
            checkInTime: '10:00 PM',
            nights: 2,
            bookingDate: '12/10/2024',
            adults: 2,
            children: 2,
            roomTypes: [
                { type: 'Duplex Room/American', action: 'Assign Room' },
                { type: 'Twin Room/American Plan', action: 'Assign Room' },
            ],
            total: '₹ 1,000.00',
            paid: '₹ 0.00',
            balance: '₹ 1,000.00',
        },
        {
            name: 'Mr. Rohit Patel',
            id: 'RS1738',
            checkInDate: '10/12/2024',
            checkInTime: '10:00 PM',
            nights: 2,
            bookingDate: '12/10/2024',
            adults: 2,
            children: 2,
            roomTypes: [
                { type: 'Duplex Room/American', action: 'Assign Room' },
                { type: 'Twin Room/American Plan', action: 'Assign Room' },
            ],
            total: '₹ 1,000.00',
            paid: '₹ 0.00',
            balance: '₹ 1,000.00',
        },
        {
            name: 'Mr. Rohit Patel',
            id: 'RS1738',
            checkInDate: '10/12/2024',
            checkInTime: '10:00 PM',
            nights: 2,
            bookingDate: '12/10/2024',
            adults: 2,
            children: 2,
            roomTypes: [
                { type: 'Duplex Room/American', action: 'Assign Room' },
                { type: 'Twin Room/American Plan', action: 'Assign Room' },
            ],
            total: '₹ 1,000.00',
            paid: '₹ 0.00',
            balance: '₹ 1,000.00',
        },
        // Add more booking objects here
    ];
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
                            <span
                                className={`subtitle-2m ${activeButton === 'reservations' ? 'btn-primary' : ''} rounded-circle`}
                            >
                                12
                            </span>
                        </h6>

                        <h6
                            className={`subtitle-1m mb-0 mx-3 p-2 ${activeButton === 'arrivals' ? 'btn-primary' : ''}`}
                            onClick={() => handleClick('arrivals')}
                        >
                            Arrivals
                            <span
                                className={`subtitle-2m ${activeButton === 'arrivals' ? 'btn-primary' : ''} rounded-circle2`}
                            >
                                21
                            </span>
                        </h6>

                        <h6
                            className={`subtitle-1m mb-0 mx-3 p-2 ${activeButton === 'departure' ? 'btn-primary' : ''}`}
                            onClick={() => handleClick('departure')}
                        >
                            Departure
                            <span
                                className={`subtitle-2m ${activeButton === 'departure' ? 'btn-primary' : ''} rounded-circle2`}
                            >
                                32
                            </span>
                        </h6>

                        <h6
                            className={`subtitle-1m mb-0 mx-3 p-2 ${activeButton === 'in-house' ? 'btn-primary' : ''}`}
                            onClick={() => handleClick('in-house')}
                        >
                            In-house
                            <span
                                className={`subtitle-2m ${activeButton === 'in-house' ? 'btn-primary' : ''} rounded-circle2`}
                            >
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
                            // data-bs-toggle="modal"
                            // data-bs-target="#Assigns_rooms"
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
                                <th scope="col" className="th-custom">
                                    Guest Name
                                </th>
                                <th scope="col" className="th-custom">
                                    Res. No
                                </th>
                                <th scope="col" className="th-custom">
                                    Booking Date
                                </th>
                                <th scope="col" className="th-custom">
                                    Arrival
                                </th>
                                <th scope="col" className="th-custom">
                                    Departure
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    width="240px"
                                >
                                    Room Detail
                                </th>
                                <th scope="col" className="th-custom">
                                    Res. Type
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    style={{ textAlign: 'right' }}
                                >
                                    Total(Rs)
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    style={{ textAlign: 'right' }}
                                >
                                    Paid(Rs)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="td-custom subtitle-1m">
                                        <div className="mt-1">
                                            {row.guestName}
                                        </div>
                                        <div className="icons-container d-flex align-items-center mt-1">
                                            <div className="icon-item d-flex align-items-center">
                                                <span className="material-icons-outlined align-items-center icon">
                                                    man
                                                </span>
                                                <span className="align-items-center">
                                                    {row.adults}
                                                </span>
                                            </div>
                                            <div className="icon-item d-flex align-items-center">
                                                <span className="material-icons-outlined align-items-center icon">
                                                    boy
                                                </span>
                                                <span className="align-items-center">
                                                    {row.children}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="td-custom body-2">
                                        {row.resNo}
                                    </td>
                                    <td className="td-custom body-2">
                                        {row.bookingDate}
                                    </td>
                                    <td className="td-custom body-2">
                                        <div className="mt-1">
                                            {row.arrivalDate}
                                        </div>
                                        <div className="mt-1">
                                            {row.arrivalTime}
                                        </div>
                                    </td>
                                    <td className="td-custom body-2">
                                        <div className="mt-1">
                                            {row.departureDate}
                                        </div>
                                        <div className="mt-1">
                                            {row.departureTime}
                                        </div>
                                    </td>
                                    <td className="td-custom body-2">
                                        <div className="mt-1">
                                            {row.roomDetail}
                                        </div>
                                        <div
                                            className="mt-1 cp"
                                            onClick={assignRooms}
                                        >
                                            <p className="assign mt-1 mb-0 cp">
                                                Assign Room
                                            </p>
                                        </div>
                                    </td>
                                    <td className="td-custom body-2">
                                        {row.resType}
                                    </td>
                                    <td
                                        className="td-custom body-2"
                                        style={{ textAlign: 'right' }}
                                    >
                                        {row.total}
                                    </td>
                                    <td
                                        className="td-custom body-2"
                                        style={{ textAlign: 'right' }}
                                    >
                                        {row.paid}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="col-12 p-3 container-page">
                    <div className="row">
                        {bookings.map((booking, index) => (
                            <BookingCard key={index} booking={booking} />
                        ))}
                    </div>
                </div>
            )}
            {open && <AssignRoomMdl open={open} setOpen={setOpen} />}
        </div>
    );
}

export default ReservationList;
