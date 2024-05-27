import React from 'react';
import Modal from '../../components/common/Modal';

function AssignRoomMdl({ open, setOpen }) {
    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal right show"
                id="Assigns_rooms"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-lg modal-lf">
                    <div className="modal-content modal-lf-container">
                        <div className="modal-header p-2">
                            <h5
                                className="modal-title headline-h6m Assignroom mt-2"
                                id="exampleModalLabel"
                            >
                                Assign Rooms
                            </h5>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <input
                                    type="date"
                                    className="form-control date custom-input"
                                    id="checkin-date"
                                    placeholder=""
                                />
                            </div>
                            <div
                                className="mb-1 mt-1"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setOpen(false)}
                                ></button>
                            </div>
                        </div>
                        <div className="">
                            <button
                                className="btn p-2 col-12 d-flex text-left p-3 modal-dropdown"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Exclusive Rooms (43)
                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto">
                                    keyboard_arrow_down
                                </span>
                            </button>
                            <button
                                className="btn p-2 col-12 d-flex text-left p-3 modal-dropdown"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Elegance Rooms (23)
                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto">
                                    keyboard_arrow_down
                                </span>
                            </button>
                            <button
                                className="btn p-2 col-12 d-flex text-left p-3 modal-dropdown"
                                type="button"
                                id="dropdownMenuButton3"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Duplex Rooms (12)
                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto">
                                    keyboard_arrow_down
                                </span>
                            </button>
                            <button
                                className="btn p-2 col-12 d-flex text-left p-3 modal-dropdown"
                                type="button"
                                id="dropdownMenuButton4"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Family Rooms (6)
                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto">
                                    keyboard_arrow_down
                                </span>
                            </button>
                            <button
                                className="btn p-2 col-12 d-flex text-left p-3 modal-dropdown"
                                type="button"
                                id="dropdownMenuButton5"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                King Suit Rooms (12)
                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto">
                                    keyboard_arrow_down
                                </span>
                            </button>

                            <ul
                                className="dropdown-menu col-12"
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <li className="border-l m-3 p-1">
                                    <div className="dropdown-item dropdown-item-nohover">
                                        <div className="row">
                                            <div
                                                className="col-2 surface-s p-0"
                                                width="2px"
                                            >
                                                <div
                                                    style={{ display: 'block' }}
                                                    className="text-center"
                                                >
                                                    <div
                                                        style={{
                                                            borderBottom:
                                                                '1px solid #c4cfd7',
                                                        }}
                                                        className="p-1"
                                                    >
                                                        10 Oct
                                                    </div>
                                                    <div className="p-1">
                                                        12 Oct
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-7 mt-2">
                                                <div className="font-ternary">
                                                    Amitava Kulkarni
                                                </div>
                                                <div className="body-2">
                                                    RS1234
                                                </div>
                                            </div>
                                            <div className="col-3 mt-2">
                                                <div className="body-2">
                                                    Room
                                                </div>
                                                <div>
                                                    <button
                                                        className="assign assign1 btn-secondary mt-1 mb-0 btn"
                                                        onclick="toggleForm(event, this)"
                                                    >
                                                        Assign Room
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="assign-room-form">
                                            <form>
                                                <div className="row mb-2">
                                                    <label
                                                        for="roomType"
                                                        className="body-2 form-label mb-0 px-0 mt-2"
                                                    >
                                                        Room Type
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="roomType"
                                                    >
                                                        <option selected>
                                                            Select room type
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
                                                <div className="row mb-2">
                                                    <label
                                                        for="roomNumber"
                                                        className="body-2 form-label mb-0 px-0"
                                                    >
                                                        Room
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="roomNumber"
                                                    >
                                                        <option selected>
                                                            Select room number
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
                                                        Assign Room
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </li>
                                <li className="border-l m-3 p-1">
                                    <div className="dropdown-item dropdown-item-nohover">
                                        <div className="row">
                                            <div
                                                className="col-2 surface-s p-0"
                                                width="2px"
                                            >
                                                <div
                                                    style={{ display: 'block' }}
                                                    className="text-center"
                                                >
                                                    <div
                                                        style={{
                                                            borderBottom:
                                                                '1px solid #c4cfd7',
                                                        }}
                                                        className="p-1"
                                                    >
                                                        10 Oct
                                                    </div>
                                                    <div className="p-1">
                                                        12 Oct
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-7 mt-2">
                                                <div className="font-ternary">
                                                    Yuvraj Vyas
                                                </div>
                                                <div className="body-2">
                                                    RS1234
                                                </div>
                                            </div>
                                            <div className="col-3 mt-2">
                                                <div className="body-2">
                                                    Room
                                                </div>
                                                <div>
                                                    <button
                                                        className="assign assign1 mt-1 btn-secondary mb-0 btn"
                                                        onclick="toggleForm(event, this)"
                                                    >
                                                        Assign Room
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="assign-room-form">
                                            <form>
                                                <div className="row mb-2">
                                                    <label
                                                        for="roomType"
                                                        className="body-2 form-label mb-0 px-0 mt-2"
                                                    >
                                                        Room Type
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="roomType"
                                                    >
                                                        <option selected>
                                                            Select room type
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
                                                <div className="row mb-2">
                                                    <label
                                                        for="roomNumber"
                                                        className="body-2 form-label mb-0 px-0"
                                                    >
                                                        Room
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="roomNumber"
                                                    >
                                                        <option selected>
                                                            Select room number
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
                                                        Assign Room
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AssignRoomMdl;
