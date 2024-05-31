import React from 'react';

function BookingCard({ booking }) {
    return (
        <div className="col-box">
            <div className="card-box">
                <div className="card-header cardheader">
                    <div>
                        <h5 className="subtitle-1m mb-0">{booking.name}</h5>
                        <p className="caption-1 mb-0">{booking.id}</p>
                    </div>
                    <span className="material-icons-outlined">more_vert</span>
                </div>
                <div className="card-body">
                    <div className="row mb-3 row13">
                        <div
                            className="col-4 d-flex flex-column justify-content-center surface-l"
                            style={{ padding: '10px' }}
                        >
                            <p className="subtitle-2m text-center mb-0">
                                {booking.checkInDate}
                            </p>
                            <p className="caption-1 text-center mb-0">
                                {booking.checkInTime}
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
                                {booking.nights}
                            </p>
                            <p className="caption-1 text-center mb-0">Nights</p>
                        </div>
                        <div
                            className="col-4 d-flex flex-column justify-content-center surface-l"
                            style={{ padding: '10px' }}
                        >
                            <p className="subtitle-2m text-center mb-0">
                                {booking.checkInDate}
                            </p>
                            <p className="caption-1 text-center mb-0">
                                {booking.checkInTime}
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <p className="subtitle-2m mb-0 p-1">Booking Date</p>
                            <p className="body-2 mt-0 p-1">
                                {booking.bookingDate}
                            </p>
                        </div>
                        <div className="col-6 d-flex align-items-center mb-3 justify-content-end">
                            <div>
                                <span className="material-icons-outlined align-items-center">
                                    man
                                </span>
                                <span className="align-items-center">
                                    {booking.adults}
                                </span>
                            </div>
                            <div className="boy">
                                <span className="material-icons-outlined align-items-center">
                                    boy
                                </span>
                                <span className="align-items-center">
                                    {booking.children}
                                </span>
                            </div>
                        </div>
                    </div>

                    {booking.roomTypes.map((room, index) => (
                        <div className="container-box mb-3" key={index}>
                            <p className="body-2">{room.type}</p>
                            <p className="assign cp">{room.action}</p>
                        </div>
                    ))}

                    <div className="container-box">
                        <p className="body-2">Total</p>
                        <p className="subtitle-2m">{booking.total}</p>
                    </div>
                    <div className="container-box">
                        <p className="body-2">Paid</p>
                        <p className="subtitle-2m">{booking.paid}</p>
                    </div>
                    <div className="container-box">
                        <p className="red">Balance</p>
                        <p className="darkred">{booking.balance}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingCard;
