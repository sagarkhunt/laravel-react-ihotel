import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

function AssignRoommdlNew({ openn, setOpenn }) {
    const [dropdownIndex, setDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const reservations = [
        {
            id: 1,
            startDate: '10 Oct',
            endDate: '12 Oct',
            name: 'Amitava Kulkarni',
            reservationCode: 'RS1234',
        },
        {
            id: 2,
            startDate: '13 Oct',
            endDate: '15 Oct',
            name: 'Jay Mehta',
            reservationCode: 'RS1298',
        },
    ];

    return (
        <Modal open={openn} handleModal={() => setOpenn(!openn)}>
            <div
                className="modal right show"
                tabIndex="-1"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-lg modal-lf">
                    <div className="modal-content modal-lf-container">
                        <div className="modal-header d-flex justify-content-between p-3">
                            <div className="modal-title headline-h6m">
                                Assign Rooms
                            </div>
                            <div className="mb-1 mt-1">
                                <button
                                    type="button"
                                    className="btn-close mx-2"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setOpenn(false)}
                                ></button>
                            </div>
                        </div>
                        <div className="modal-body scrollable-modal-body">
                            <div className="row mb-3">
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
                                    <span>amitavakulkarni@gmail.com</span>
                                </p>
                            </div>
                            <div className="row ms-1">
                                <div className="col-6 p-0">
                                    <div>
                                        <p className="mb-0 body-2">
                                            Reservation Number
                                        </p>
                                        <p className="subtitle-1m">RS12345</p>
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
                                        <p className="mb-0 body-2">Pax</p>
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
                                <div className="col-6 p-0">
                                    <div>
                                        <p className="mb-0 body-2">Status</p>
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
                                <div
                                    className="ps-0"
                                    aria-labelledby="exclusiveRooms"
                                >
                                    <ul className="col-12 p-0 noBullet">
                                        {reservations.map(
                                            (reservation, index) => (
                                                <li
                                                    key={reservation.id}
                                                    className="border-l m-3 p-1"
                                                >
                                                    <div className="dropdown-item dropdown-item-nohover">
                                                        <div className="row">
                                                            <div
                                                                className="col-2 surface-s p-0 text-center"
                                                                width="2px"
                                                            >
                                                                <div
                                                                    style={{
                                                                        borderBottom:
                                                                            '1px solid #c4cfd7',
                                                                    }}
                                                                    className="p-1"
                                                                >
                                                                    {
                                                                        reservation.startDate
                                                                    }
                                                                </div>
                                                                <div className="p-1">
                                                                    {
                                                                        reservation.endDate
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-7 mt-2">
                                                                <div className="font-ternary">
                                                                    {
                                                                        reservation.name
                                                                    }
                                                                </div>
                                                                <div className="body-2">
                                                                    {
                                                                        reservation.reservationCode
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-3 mt-2">
                                                                <div className="body-2">
                                                                    Room
                                                                </div>
                                                                <div>
                                                                    <button
                                                                        className="assign assign1 btn-secondary mt-1 mb-0 btn"
                                                                        onClick={() =>
                                                                            toggleDropdown(
                                                                                index,
                                                                            )
                                                                        }
                                                                    >
                                                                        Assign
                                                                        Room
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {dropdownIndex ===
                                                            index && (
                                                            <div className="assign-room-form">
                                                                <form>
                                                                    <div className="row mb-2">
                                                                        <label
                                                                            htmlFor={`roomType-${index}`}
                                                                            className="body-2 form-label mb-0 px-0 mt-2"
                                                                        >
                                                                            Room
                                                                            Type
                                                                        </label>
                                                                        <select
                                                                            className="form-select"
                                                                            id={`roomType-${index}`}
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
                                                                    <div className="row mb-2">
                                                                        <label
                                                                            htmlFor={`roomNumber-${index}`}
                                                                            className="body-2 form-label mb-0 px-0"
                                                                        >
                                                                            Room
                                                                        </label>
                                                                        <select
                                                                            className="form-select"
                                                                            id={`roomNumber-${index}`}
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
                                                                            Check
                                                                            In
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
                                                        )}
                                                    </div>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AssignRoommdlNew;
