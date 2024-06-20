import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

export default function GroupReservationMdl({ open2, setOpen2 }) {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleAssignRoomClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <Modal open={open2} handleModal={() => setOpen2(!open2)}>
            <div
                className="modal right show "
                tabIndex="-1"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-xl modal-lf double-modal">
                    <div className="row">
                        <div className="col-7 p-0">
                            <div className="modal-content modal-lf-container">
                                <div className="modal-header d-flex justify-content-between p-3">
                                    <div className="ms-1">
                                        <h5
                                            className="modal-title headline-h6m title-modal"
                                            id="exampleModalLabel"
                                        >
                                            Amitava Kulkarni
                                        </h5>
                                        <p className="mb-0">
                                            <span className="material-icons-outlined align-items-center icon">
                                                call
                                            </span>
                                            <span className="sapn_header">
                                                9898989898
                                            </span>
                                            <span className="material-icons-outlined align-items-center icon ms-2">
                                                location_on
                                            </span>
                                            <span>India</span>
                                            <span className="material-icons-outlined align-items-center icon ms-2">
                                                email
                                            </span>
                                            <span>
                                                amitavakulkarni@gmail.com
                                            </span>
                                        </p>
                                    </div>
                                    <div
                                        className="mb-1 mt-1"
                                        onClick={() => setOpen2(false)}
                                    >
                                        <button
                                            type="button"
                                            className="btn-close mx-2"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                </div>
                                <div className="modal-body scrollable-modal-body">
                                    <div className="row ms-1">
                                        <div className="col-6 ps-0">
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Reservation Number
                                                </p>
                                                <p className="subtitle-1m">
                                                    RS12345
                                                </p>
                                            </div>
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Arrival Date
                                                </p>
                                                <p className="subtitle-1m">
                                                    10/10/2024{' '}
                                                    <span className="body-1l">
                                                        11:00 AM
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Booking Date
                                                </p>
                                                <p className="subtitle-1m">
                                                    3/10/2024{' '}
                                                    <span className="body-1l">
                                                        11:00 AM
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Pax
                                                </p>
                                                <div className="icons-container d-flex align-items-center mt-0">
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
                                            </div>
                                        </div>
                                        <div className="col-6 ps-0">
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Status
                                                </p>
                                                <p className="subtitle-1m">
                                                    Confirmed Reservation
                                                </p>
                                            </div>
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Arrival Date
                                                </p>
                                                <p className="subtitle-1m">
                                                    10/10/2024{' '}
                                                    <span className="body-1l">
                                                        11:00 AM
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Room Category
                                                </p>
                                                <p className="subtitle-1m">
                                                    Duplex Room
                                                </p>
                                            </div>
                                            <div>
                                                <p className="mb-0 body-2">
                                                    Average Daily Rate
                                                </p>
                                                <p className="subtitle-1m">
                                                    Rs. 1,000.00
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="row d-flex justify-content-between mx-2 mt-2">
                                            <button className="col-md-4 ms-0 bordered-column border-l btn-outline col-4_span d-flex flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2">
                                                    check_circle
                                                </span>
                                                <p className="text-center mb-0">
                                                    Check In
                                                </p>
                                            </button>
                                            <button className="col-md-4 bordered-column border-l btn-outline col-4_span d-flex flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2">
                                                    print
                                                </span>
                                                <p className="text-center mb-0">
                                                    Print Reg. Card
                                                </p>
                                            </button>
                                            <button className="col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2">
                                                    edit_calendar
                                                </span>
                                                <p className="text-center mb-0">
                                                    Amend Stay
                                                </p>
                                            </button>
                                        </div>
                                        <div className="row d-flex justify-content-between mx-2 mt-4">
                                            <button className="col-md-4  ms-0 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2 mb-2">
                                                    credit_card
                                                </span>
                                                <p className="text-center mb-0">
                                                    Add Payment
                                                </p>
                                            </button>
                                            <button className="col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2">
                                                    move_up
                                                </span>
                                                <p className="text-center mb-0">
                                                    Room Move
                                                </p>
                                            </button>
                                            <button className="col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2">
                                                    change_circle
                                                </span>
                                                <p className="text-center mb-0">
                                                    Exchange Room
                                                </p>
                                            </button>
                                        </div>
                                        <div className="row d-flex justify-content-between mx-2 mt-4">
                                            <button className="col-md-4 ms-0 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2">
                                                    front_hand
                                                </span>
                                                <p className="text-center mb-0">
                                                    Stop Room Move
                                                </p>
                                            </button>
                                            <button className="col-md-4 bordered-column border-l col-4_span d-flex btn-outline flex-column align-items-center">
                                                <span className="material-icons-outlined align-items-center icon2">
                                                    highlight_off
                                                </span>
                                                <p className="text-center mb-0">
                                                    Void Transaction
                                                </p>
                                            </button>
                                            <button className="col-md-4 bordered-column border-l col-4_span no-block"></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-primary d-flex"
                                        data-bs-toggle="modal"
                                        data-bs-target="#"
                                    >
                                        Edit Reservation
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-5 p-0">
                            <div className="modal-content modal-lf-container">
                                <div className="modal-header mb-2 d-flex justify-content-between no-border p-3 pb-0">
                                    <div className="ms-1">
                                        <h5
                                            className="modal-title headline-h6m"
                                            id="exampleModalLabel"
                                        >
                                            Group Reservation List
                                        </h5>
                                    </div>
                                    <div
                                        className="mb-1 mt-1"
                                        onClick={() => setOpen2(false)}
                                    >
                                        <button
                                            type="button"
                                            className="btn-close mx-2"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                </div>
                                <div className="modal-body pt-0 scrollable-modal-body">
                                    <div className="row">
                                        <div aria-labelledby="exclusiveRooms">
                                            <ul className="col-12 p-0 ul-list">
                                                {/* Repeat this list item for each reservation */}
                                                <li className=" list-container-GRM me-3">
                                                    <div className="dropdown-item  dropdown-item-nohover">
                                                        <div className="row mx-2 mb-2 mt-1">
                                                            <div
                                                                className="font-ternary p-0"
                                                                style={{
                                                                    display:
                                                                        'inline-block',
                                                                }}
                                                            >
                                                                Amitava Kulkarni
                                                                <span className="material-icons-outlined mb-1">
                                                                    star_border_purple500
                                                                </span>
                                                            </div>
                                                            <div className="body-2 p-0">
                                                                RS1234
                                                            </div>
                                                        </div>
                                                        <div className="row mx-2">
                                                            <div
                                                                className="col-4 p-0 mt-2"
                                                                width="2px"
                                                            >
                                                                <div className="body-2">
                                                                    Room
                                                                    Category
                                                                </div>
                                                                <div className="subtitle-1m mt-1">
                                                                    Duplex Room
                                                                </div>
                                                            </div>
                                                            <div className="col-5 mt-2">
                                                                <p className="mb-0 body-2">
                                                                    Pax
                                                                </p>
                                                                <div className="icons-container d-flex align-items-center mt-0">
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
                                                            </div>
                                                            <div className="col-3">
                                                                <div className="body-2">
                                                                    Room
                                                                </div>
                                                                <div>
                                                                    <button
                                                                        className="assign assign1 btn-secondary mt-1 mb-2 btn"
                                                                        onClick={
                                                                            handleAssignRoomClick
                                                                        }
                                                                    >
                                                                        Assign
                                                                        Room
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`assign-room-form ${isFormVisible ? '' : 'd-none'}`}
                                                        >
                                                            <form>
                                                                <div className="row mb-2">
                                                                    <div className="col p-0 pe-1">
                                                                        <label
                                                                            htmlFor="roomType"
                                                                            className="body-2 form-label mb-0 px-0 mt-2"
                                                                        >
                                                                            Room
                                                                            Type
                                                                        </label>
                                                                        <select
                                                                            className="form-select"
                                                                            id="roomType"
                                                                        >
                                                                            <option
                                                                                selected
                                                                            >
                                                                                Select
                                                                                room
                                                                                type
                                                                            </option>
                                                                            <option value="1">
                                                                                Single
                                                                            </option>
                                                                            <option value="2">
                                                                                Double
                                                                            </option>
                                                                            <option value="3">
                                                                                Suite
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="col p-0 ps-1">
                                                                        <label
                                                                            htmlFor="roomNumber"
                                                                            className="body-2 form-label mb-0 px-0 mt-2"
                                                                        >
                                                                            Room
                                                                        </label>
                                                                        <select
                                                                            className="form-select"
                                                                            id="roomNumber"
                                                                        >
                                                                            <option
                                                                                selected
                                                                            >
                                                                                Select
                                                                                room
                                                                                number
                                                                            </option>
                                                                            <option value="101">
                                                                                101
                                                                            </option>
                                                                            <option value="102">
                                                                                102
                                                                            </option>
                                                                            <option value="103">
                                                                                103
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <hr className="row border-l mb-2 mt-4" />
                                                                <div className="mb-3 d-flex justify-content-end">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline me-2"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary me-2"
                                                                    >
                                                                        Check In
                                                                    </button>
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Assign
                                                                        Room
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* Add more list items as needed */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
