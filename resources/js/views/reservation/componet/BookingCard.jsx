import React, { useState } from 'react';
import AssignRoomMdl from './AssignRoomMdl';

function BookingCard({ booking }) {
    const [open, setOpen] = useState(false);
    const openAssignRoom = () => {
        setOpen(true);
    };
    return (
        <div className="col-3">
            {/* <!-- reservation card  --> */}
            <div className="card p-3">
                <div className="row">
                    <div className="col-10">
                        <div className="d-flex flex-column">
                            <h5 className="subtitle-1m mb-0">{booking.name}</h5>
                            <p className="caption-1 mb-0">{booking.id}</p>
                        </div>
                    </div>
                    <div className="col-2 align-items-center">
                        <span className="material-icons-outlined">
                            more_vert
                        </span>
                    </div>
                </div>

                <span className="card-content-seperator"></span>

                <div className="row m-0">
                    <div className="col-4 p-0">
                        <div className="d-flex flex-column gap-1 justify-content-center surface-l p-2">
                            <p className="subtitle-2m text-center mb-0">
                                {booking.checkInDate}
                            </p>
                            <p className="caption-1 text-center mb-0">
                                {booking.checkInTime}
                            </p>
                        </div>
                    </div>
                    <div className="col-4 p-0">
                        <div className="d-flex flex-column gap-1 justify-content-center p-2 surface-d">
                            <p className="subtitle-2m text-center mb-0">
                                {booking.nights}
                            </p>
                            <p className="caption-1 text-center  mb-0">
                                Nights
                            </p>
                        </div>
                    </div>

                    <div className="col-4 p-0">
                        <div className="d-flex flex-column gap-1 justify-content-center surface-l p-2">
                            <p className="subtitle-2m text-center mb-0">
                                {booking.checkInDate}
                            </p>
                            <p className="caption-1 text-center  mb-0">
                                {booking.checkInTime}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row mx-0 my-3">
                    <div className="col-8 p-0">
                        <div className="w-100">
                            <p className="subtitle-2m mb-1">Booking Date</p>
                            <p className="body-2 m-0">{booking.bookingDate}</p>
                        </div>
                    </div>
                    <div className="col-4 p-0">
                        <div className="d-flex align-items-center justify-content-end">
                            <div className="d-flex align-items-center">
                                <span className=" material-icons-outlined">
                                    man
                                </span>
                                <span className="align-items-center">
                                    {booking.adults}
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-icons-outlined">
                                    boy
                                </span>
                                <span className="align-items-center">
                                    {booking.children}
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
                        {booking.roomTypes.map((room, index) => (
                            <div
                                className="row mx-0 mb-1 align-items-center"
                                key={index}
                            >
                                <div className="col-8 p-0">
                                    <p className="body-2 m-0 overflow-hidden text-nowrap">
                                        {room.type}
                                    </p>
                                </div>
                                <div className="col-4 p-0 d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn assign cp"
                                        onClick={openAssignRoom}
                                    >
                                        {room.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* <div className="row mx-0 mb-1 align-items-center">
                            <div className="col-8 p-0">
                                <p className="body-2 m-0">
                                    Duplex Room/American Plan
                                </p>
                            </div>
                            <div className="col-4 p-0 d-flex justify-content-end">
                                <button type="button" className="btn assign">
                                    Assign Room
                                </button>
                            </div>
                        </div>
                        <div className="row mx-0 mb-1 align-items-center">
                            <div className="col-8 p-0">
                                <p className="body-2 m-0">
                                    Duplex Room/American Plan
                                </p>
                            </div>
                            <div className="col-4 p-0 d-flex justify-content-end">
                                <button type="button" className="btn assign">
                                    Assign Room
                                </button>
                            </div>
                        </div> */}
                    </div>

                    <div className="mt-3 p-0">
                        <div className="row mx-0 my-2 p-0">
                            <div className="col-6 p-0">
                                <p className="body-2 m-0">Total</p>
                            </div>
                            <div className="col-6 p-0 d-flex justify-content-end">
                                <p className="subtitle-2m m-0">
                                    ₹ {booking.total}
                                </p>
                            </div>
                        </div>
                        <div className="row mx-0 my-2 p-0">
                            <div className="col-6 p-0">
                                <p className="body-2 m-0">Paid</p>
                            </div>
                            <div className="col-6 p-0 d-flex justify-content-end">
                                <p className="subtitle-2m m-0">
                                    ₹ {booking.paid}
                                </p>
                            </div>
                        </div>
                        <div className="row mx-0 my-2 p-0">
                            <div className="col-6 p-0">
                                <p className="body-2 m-0 red">Balance</p>
                            </div>
                            <div className="col-6 p-0 d-flex justify-content-end">
                                <p className="subtitle-2m m-0 darkred">
                                    ₹ {booking.balance}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {open && <AssignRoomMdl open={open} setOpen={setOpen} />}
        </div>
    );
}

export default BookingCard;
