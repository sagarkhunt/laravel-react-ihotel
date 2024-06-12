import React, { useState } from 'react';
import '../../../css/AddReservation.css';
import AssignRoomMdl from './componet/AssignRoomMdl';
import BookingCard from './componet/BookingCard';
import FilterReservationList from './componet/FilterReservationList';
import { Link, useNavigate } from 'react-router-dom';

function ReservationList() {
    const [isGridView, setIsGridView] = useState(true);
    const [open, setOpen] = useState(false);

    const [activeButton, setActiveButton] = useState('reservations');
    const navigate = useNavigate();
    const [dropdownIndex, setDropdownIndex] = useState(null);

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };
    const assignRooms = () => {
        setOpen(true);
    };
    const [open1, setOpen1] = useState(false);
    function handleshowFilteredData() {
        setOpen1(true);
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
                { type: 'American Plan', action: 'Assign Room' },
                { type: 'Twin Room', action: 'Assign Room' },
            ],
            total: '1,000.00',
            paid: '0.00',
            balance: '1,000.00',
        },
        {
            name: 'Mr. Sahil Patel',
            id: 'RS1234',
            checkInDate: '10/12/2024',
            checkInTime: '10:00 PM',
            nights: 2,
            bookingDate: '12/10/2024',
            adults: 2,
            children: 2,
            roomTypes: [
                { type: 'Duplex Room/American', action: 'Assign Room' },
                { type: 'Twin Room/American Plan', action: 'Assign Room' },
                { type: 'American Plan', action: 'Assign Room' },
                { type: 'Twin Room', action: 'Assign Room' },
            ],
            total: '1,000.00',
            paid: '0.00',
            balance: '1,000.00',
        },
        {
            name: 'Mr. Pratik Patel',
            id: 'RS4521',
            checkInDate: '10/12/2024',
            checkInTime: '10:00 PM',
            nights: 2,
            bookingDate: '12/10/2024',
            adults: 2,
            children: 2,
            roomTypes: [
                { type: 'Duplex Room/American', action: 'Assign Room' },
                { type: 'Twin Room/American Plan', action: 'Assign Room' },
                { type: 'American Plan', action: 'Assign Room' },
                { type: 'Twin Room', action: 'Assign Room' },
            ],
            total: '1,000.00',
            paid: '0.00',
            balance: '1,000.00',
        },
        {
            name: 'Mr. Dharmik Patel',
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
                { type: 'American Plan', action: 'Assign Room' },
                { type: 'Twin Room', action: 'Assign Room' },
            ],
            total: '1,000.00',
            paid: '0.00',
            balance: '1,000.00',
        },
        // Add more booking objects here
    ];
    return (
        <div className="m-4">
            <div className="col-12 mt-3 pannel action-header px-3">
                <div className="row">
                    <div className="col-6 d-flex align-items-center">
                        {/* <h6 className="subtitle-1m btn-primary reservations mb-0 p-2">
                            Reservations
                            <span className="subtitle-2m btn-primary rounded-circle">
                                12
                            </span>
                        </h6>

                        <h6 className="subtitle-1m mb-0 mx-3">
                            Arrivals
                            <span className="subtitle-2m rounded-circle2">
                                21
                            </span>
                        </h6> */}
                        <div className="col-6 d-flex align-items-end">
                            <h6
                                className={`subtitle-1m mb-0 p-2 cp ${
                                    activeButton === 'reservations'
                                        ? 'btn-primary reservations'
                                        : ''
                                }`}
                                onClick={() => setActiveButton('reservations')}
                            >
                                Reservations
                                <span
                                    className={`subtitle-2m ${
                                        activeButton === 'reservations'
                                            ? 'btn-primary rounded-circle'
                                            : ''
                                    }`}
                                >
                                    12
                                </span>
                            </h6>

                            <h6
                                className={`subtitle-1m mb-0 mx-3 p-2 cp ${
                                    activeButton === 'arrivals'
                                        ? 'btn-primary'
                                        : ''
                                }`}
                                onClick={() => setActiveButton('arrivals')}
                            >
                                Arrivals
                                <span
                                    className={`subtitle-2m ${
                                        activeButton === 'arrivals'
                                            ? 'btn-primary rounded-circle'
                                            : 'rounded-circle2'
                                    }`}
                                >
                                    21
                                </span>
                            </h6>
                        </div>
                    </div>
                    <div className="col-6 gap-3 action-right">
                        <div className="form-group mt-3 mb-3 position-relative search-container">
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

                        <div
                            className="btn-group btn-group-toggle border rounded"
                            data-toggle="buttons"
                        >
                            <label
                                className={`btn p-1 align-items-center justify-content-center d-flex w-50 ${!isGridView ? 'active' : ''}`}
                                onClick={() => {
                                    if (isGridView) toggleView();
                                }}
                            >
                                <input
                                    type="radio"
                                    name="options"
                                    id="option1"
                                    autoComplete="off"
                                    className="d-none"
                                    required
                                    checked={isGridView}
                                    readOnly
                                />
                                <span className="material-icons">
                                    view_comfy
                                </span>
                            </label>
                            <label
                                className={`btn p-1 align-items-center d-flex justify-content-center w-50 ${isGridView ? 'active' : ''}`}
                                onClick={() => {
                                    if (!isGridView) toggleView();
                                }}
                            >
                                <input
                                    type="radio"
                                    name="options"
                                    id="option2"
                                    autoComplete="off"
                                    className="d-none"
                                    required
                                    checked={!isGridView}
                                    readOnly
                                />
                                <span className="material-icons"> list </span>
                            </label>
                        </div>

                        <button
                            className="btn btn-secondary d-flex w-auto "
                            onClick={handleshowFilteredData}
                        >
                            {/* <span className="material-icons-outlined">
                                        tune
                                    </span> */}
                            <span className="material-icons-outlined me-0">
                                filter_alt
                            </span>
                        </button>
                        <button
                            className="btn btn-primary d-flex "
                            onClick={() => {
                                navigate('/add-reservation');
                            }}
                        >
                            <span className="material-icons-outlined">add</span>
                            Reservation
                        </button>
                    </div>
                </div>
            </div>

            {isGridView ? (
                <div className="col-12 pt-3">
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
                                    Total(₹)
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    style={{ textAlign: 'right' }}
                                >
                                    Paid(₹)
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    style={{ textAlign: 'right' }}
                                ></th>
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
                                            onClick={() => assignRooms()}
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
                                    <td className="td-custom body-2 text-center">
                                        <div className="dropdown">
                                            <span
                                                className="material-icons-outlined"
                                                onClick={() =>
                                                    toggleDropdown(index)
                                                }
                                                style={{ cursor: 'pointer' }}
                                            >
                                                more_vert
                                            </span>
                                            {dropdownIndex === index && (
                                                <div className="dropdown-menu-re show">
                                                    <div className="px-3 py-4 dropdown-reservation_list">
                                                        <Link
                                                            className="dropdown-item subtitle-2m"
                                                            href="#"
                                                        >
                                                            <span
                                                                className="material-icons-outlined me-2"
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                print
                                                            </span>
                                                            Print GRC
                                                        </Link>
                                                    </div>
                                                    <div className="px-3 py-4 dropdown-reservation_list">
                                                        <Link
                                                            className="dropdown-item subtitle-2m"
                                                            href="#"
                                                        >
                                                            <span
                                                                className="material-icons-outlined me-2"
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                exit_to_app
                                                            </span>
                                                            Check In
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="col-12">
                    <div className="row">
                        {bookings.map((booking, index) => (
                            <BookingCard
                                key={index}
                                booking={booking}
                                index={index}
                                openDropdownIndex={openDropdownIndex}
                                setOpenDropdownIndex={setOpenDropdownIndex}
                            />
                        ))}
                    </div>
                </div>
            )}
            {open && <AssignRoomMdl open={open} setOpen={setOpen} />}
            {open1 && (
                <FilterReservationList open1={open1} setOpen1={setOpen1} />
            )}
        </div>
    );
}

export default ReservationList;
