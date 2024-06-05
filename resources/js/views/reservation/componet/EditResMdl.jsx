import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import { useNavigate } from 'react-router-dom';

function EditResMdl({ showEdirRes, setShowEditRes, setOpen }) {
    const [activeButton, setActiveButton] = useState(null);
    const navigate = useNavigate();
    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    const editReservstion = () => {
        navigate('/edit_res_info');
    };
    const reservationData = {
        name: 'Devang Kulkarni',
        phoneNumber: '9898989898',
        location: 'Gujrat',
        email: 'devkulkarni@gmail.com',
        reservationNumber: 'RS12345',
        arrivalDate: '10/10/2024 11:00 AM',
        bookingDate: '3/10/2024 11:00 AM',
        pax: {
            men: 2,
            boys: 1,
        },
        status: 'Confirmed Reservation',
        roomCategory: 'Duplex Room',
        averageDailyRate: 'Rs. 1,000.00',
    };
    return (
        <Modal
            showEdirRes={showEdirRes}
            handleModal={() => setShowEditRes(!showEdirRes)}
        >
            <div
                className="modal right fade show"
                id="Edit_res"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-lg modal-lf">
                    <div className="modal-content modal-lf-container">
                        <div className="modal-header p-2">
                            <div>
                                <h5
                                    className="modal-title headline-h6m title-modal"
                                    id="exampleModalLabel"
                                >
                                    {reservationData.name}
                                </h5>
                                <p className="mb-0 contact-info">
                                    <span className="material-icons-outlined align-items-center icon">
                                        call
                                    </span>
                                    <span className="sapn_header">
                                        {reservationData.phoneNumber}
                                    </span>
                                    <span className="material-icons-outlined align-items-center icon">
                                        location_on
                                    </span>
                                    <span>{reservationData.location}</span>
                                    <span className="material-icons-outlined align-items-center icon">
                                        email
                                    </span>
                                    <span>{reservationData.email}</span>
                                </p>
                            </div>
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="btn-close mx-2"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setOpen(true);
                                        setShowEditRes(false);
                                    }}
                                ></button>
                            </div>
                        </div>

                        <div
                            className="modal-body scrollable-modal-body"
                            style={{ overflowY: 'auto' }}
                        >
                            <div className="row ms-1">
                                <div className="col-6">
                                    <div>
                                        <p className="mb-0 body-2">
                                            Reservation Number
                                        </p>
                                        <p className="subtitle-1m">
                                            {reservationData.reservationNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Arrival Date
                                        </p>
                                        <p className="subtitle-1m">
                                            {reservationData.arrivalDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Booking Date
                                        </p>
                                        <p className="subtitle-1m">
                                            {reservationData.bookingDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">Pax</p>
                                        <div className="icons-container d-flex align-items-center mt-0">
                                            <div className="icon-item d-flex align-items-center">
                                                <span className="material-icons-outlined align-items-center icon">
                                                    man
                                                </span>
                                                <span className="align-items-center">
                                                    {reservationData.pax.men}
                                                </span>
                                            </div>
                                            <div className="icon-item d-flex align-items-center">
                                                <span className="material-icons-outlined align-items-center icon">
                                                    boy
                                                </span>
                                                <span className="align-items-center">
                                                    {reservationData.pax.boys}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div>
                                        <p className="mb-0 body-2">Status</p>
                                        <p className="subtitle-1m">
                                            {reservationData.status}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Arrival Date
                                        </p>
                                        <p className="subtitle-1m">
                                            {reservationData.arrivalDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Room Category
                                        </p>
                                        <p className="subtitle-1m">
                                            {reservationData.roomCategory}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Average Daily Rate
                                        </p>
                                        <p className="subtitle-1m">
                                            {reservationData.averageDailyRate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                {activeButton === 'Amend Stay'
                                    ? 'active-btn'
                                    : ''}
                                <div className="row row_sapn">
                                    <button
                                        className={`col-md-4 bordered-column border-l btn-outline col-4_span d-flex flex-column align-items-center ${activeButton === 'Check In' ? 'active-btn' : ''}`}
                                        onClick={() => handleClick('Check In')}
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            check_circle
                                        </span>
                                        <p className="text-center mb-0">
                                            Check In
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l btn-outline col-4_span d-flex flex-column align-items-center ${activeButton === 'Print Reg. Card' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Print Reg. Card')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            print
                                        </span>
                                        <p className="text-center mb-0">
                                            Print Reg. Card
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Amend Stay' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Amend Stay')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            edit_calendar
                                        </span>
                                        <p className="text-center mb-0">
                                            Amend Stay
                                        </p>
                                    </button>
                                </div>
                                <div className="row row_sapn mt-2">
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Add Payment' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Add Payment')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2 mb-2">
                                            credit_card
                                        </span>
                                        <p className="text-center mb-0">
                                            Add Payment
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Room Move' ? 'active-btn' : ''}`}
                                        onClick={() => handleClick('Room Move')}
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            move_up
                                        </span>
                                        <p className="text-center mb-0">
                                            Room Move
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Exchange Room' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Exchange Room')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            change_circle
                                        </span>
                                        <p className="text-center mb-0">
                                            Exchange Room
                                        </p>
                                    </button>
                                </div>
                                <div className="row row_sapn mt-2">
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Stop Room Move' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Stop Room Move')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            front_hand
                                        </span>
                                        <p className="text-center mb-0">
                                            Stop Room Move
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span d-flex btn-outline flex-column align-items-center ${activeButton === 'Void Transaction' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Void Transaction')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            highlight_off
                                        </span>
                                        <p className="text-center mb-0">
                                            Void Transaction
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary d-flex"
                                // data-bs-toggle="modal"
                                // data-bs-target="#"
                                onClick={editReservstion}
                            >
                                Edit Reservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default EditResMdl;
