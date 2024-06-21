import React, { useState } from 'react';
import AssignRoomMdl from './AssignRoomMdl';
import { Link } from 'react-router-dom';
import AssignRoommdlNew from './AssignRoommdlNew';
import GroupReservationMdl from './GroupReservationMdl';

function BookingCard({
    booking,
    index,
    openDropdownIndex,
    setOpenDropdownIndex,
}) {
    const [open, setOpen] = useState(false);
    const openAssignRoom = () => {
        setOpen(true);
    };

    const [open2, setOpen2] = useState(false);
    const openGroupReservationMdl = () => {
        setOpen2(true);
    };

    function getGuestName(data) {
        let guest = {};
        try {
            guest = JSON.parse(data);
        } catch (error) {
            console.error(`Error parsing guest JSON at index ${index}:`, error);
        }

        const fullName = guest.full_name || 'No name available';
        return fullName;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const toggleDropdown = () => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const [openn, setOpenn] = useState(false);
    const openAssignRoommdlNew = () => {
        setOpenn(true);
    };

    return (
        <div className="col-3">
            {/* <!-- reservation card  --> */}
            <div className="card p-3">
                <div className="row">
                    <div className="col-10">
                        <div className="d-flex flex-column">
                            <h5 className="subtitle-1m mb-0">
                                {getGuestName(booking?.guest_json)}
                            </h5>
                            <p className="caption-1 mb-0">RS{booking.id}</p>
                        </div>
                    </div>
                    <div className="col-2 align-items-center">
                        <div className="dropdown">
                            <span
                                className="material-icons-outlined"
                                onClick={toggleDropdown} // Passing index here
                                style={{ cursor: 'pointer' }}
                            >
                                more_vert
                            </span>
                            {openDropdownIndex === index && (
                                <div className="dropdown-menu-re show">
                                    <div
                                        className="px-3 py-4 dropdown-reservation_list"
                                        onClick={openAssignRoommdlNew}
                                    >
                                        <Link
                                            className="dropdown-item subtitle-2m"
                                            href="#"
                                            onClick={() =>
                                                setOpenDropdownIndex(false)
                                            }
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
                                    <div
                                        className="px-3 py-4 dropdown-reservation_list"
                                        onClick={openGroupReservationMdl}
                                    >
                                        <Link
                                            className="dropdown-item subtitle-2m"
                                            href="#"
                                            onClick={() =>
                                                setOpenDropdownIndex(false)
                                            }
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
                    </div>
                </div>

                <span className="card-content-seperator"></span>

                <div className="row m-0">
                    <div className="col-4 p-0">
                        <div className="d-flex flex-column gap-1 justify-content-center surface-l p-2">
                            <p className="subtitle-2m text-center mb-0">
                                {formatDate(booking.frm_dt)}
                            </p>
                            <p className="caption-1 text-center mb-0">
                                {/* {booking.checkInTime} */}
                                10:00 PM
                            </p>
                        </div>
                    </div>
                    <div className="col-4 p-0">
                        <div className="d-flex flex-column gap-1 justify-content-center p-2 surface-d">
                            <p className="subtitle-2m text-center mb-0">
                                {booking.non}
                            </p>
                            <p className="caption-1 text-center  mb-0">
                                Nights
                            </p>
                        </div>
                    </div>

                    <div className="col-4 p-0">
                        <div className="d-flex flex-column gap-1 justify-content-center surface-l p-2">
                            <p className="subtitle-2m text-center mb-0">
                                {formatDate(booking.to_dt)}
                            </p>
                            <p className="caption-1 text-center  mb-0">
                                10:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row mx-0 my-3">
                    <div className="col-8 p-0">
                        <div className="w-100">
                            <p className="subtitle-2m mb-1">Booking Date</p>
                            <p className="body-2 m-0">
                                {formatDate(booking.created_at)}
                            </p>
                        </div>
                    </div>
                    <div className="col-4 p-0">
                        <div className="d-flex align-items-center justify-content-end">
                            <div className="d-flex align-items-center">
                                <span className=" material-icons-outlined">
                                    man
                                </span>
                                <span className="align-items-center">
                                    {/* {booking.adults} */}2
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-icons-outlined">
                                    boy
                                </span>
                                <span className="align-items-center">
                                    {/* {booking.children} */}1
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mx-0 my-2">
                    <div className="row mx-0 mb-2 p-0">
                        <div className="col-6 p-0">
                            <p className="subtitle-2m m-0">Room/Rate Type</p>
                        </div>
                        <div className="col-6 p-0 d-flex justify-content-end">
                            <p className="subtitle-2m m-0">Confirm Booking</p>
                        </div>
                    </div>

                    <div className="y_scrolling p-0" style={{ height: '60px' }}>
                        {booking?.room_inventory?.map((room, index) => (
                            <div
                                className="row mx-0 mb-1 align-items-center"
                                key={index}
                            >
                                <div className="col-8 p-0">
                                    <p className="body-2 m-0 overflow-hidden text-nowrap">
                                        {room?.room_cat?.cat_name}/
                                        {room?.room_plan?.plan_name}
                                    </p>
                                </div>
                                <div className="col-4 p-0 d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn assign cp"
                                        onClick={openAssignRoom}
                                    >
                                        Assign Room
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 p-0">
                        <div className="row mx-0 my-2 p-0">
                            <div className="col-6 p-0">
                                <p className="body-2 m-0">Total</p>
                            </div>
                            <div className="col-6 p-0 d-flex justify-content-end">
                                <p className="subtitle-2m m-0">
                                    ₹ {booking.total_amt}
                                </p>
                            </div>
                        </div>
                        <div className="row mx-0 my-2 p-0">
                            <div className="col-6 p-0">
                                <p className="body-2 m-0">Paid</p>
                            </div>
                            <div className="col-6 p-0 d-flex justify-content-end">
                                <p className="subtitle-2m m-0">
                                    ₹ {booking?.room_adv_payment?.pay_amnt}
                                </p>
                            </div>
                        </div>
                        <div className="row mx-0 my-2 p-0">
                            <div className="col-6 p-0">
                                <p className="body-2 m-0 red">Balance</p>
                            </div>
                            <div className="col-6 p-0 d-flex justify-content-end">
                                <p className="subtitle-2m m-0 darkred">
                                    ₹{' '}
                                    {(
                                        booking.total_amt -
                                        booking?.room_adv_payment?.pay_amnt
                                    ).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {open && <AssignRoomMdl open={open} setOpen={setOpen} />}
            {openn && <AssignRoommdlNew openn={openn} setOpenn={setOpenn} />}
            {open2 && <GroupReservationMdl open2={open2} setOpen2={setOpen2} />}
        </div>
    );
}

export default BookingCard;
