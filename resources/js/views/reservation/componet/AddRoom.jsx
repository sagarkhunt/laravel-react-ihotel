import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

const AddRoom = ({ formData, showAddRoom, setShowAddRoom, setFormData }) => {
    const addRoom = () => {
        setRDetails([
            ...rDetails,
            {
                roomType: '1',
                ratePlan: '1',
                room: '1',
                adult: '2',
                child: '1',
                rate: 4000.0,
            },
        ]);
    };
    const rooms = structuredClone(formData.roomDetails);
    const [rDetails, setRDetails] = useState(rooms);

    const [isEditPrice, setIsEditPrice] = useState({});

    const handleInputChange = (event, index, field) => {
        const { value } = event.target;
        const newRoomDetails = [...rDetails];
        newRoomDetails[index][field] = value;
        setRDetails(newRoomDetails);
    };

    const toggleEditPrice = (index) => {
        setIsEditPrice((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <Modal
            open={showAddRoom}
            handleModal={() => setShowAddRoom(!showAddRoom)}
        >
            <div
                className="modal"
                id="availibility_inquiry"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog  modal-center"
                    style={{
                        minWidth: '70%',
                    }}
                >
                    <div className="modal-content h-75">
                        <div className="modal-header d-flex justify-content-between">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Add Room
                            </h5>
                            <div className="d-flex gap-4 align-items-center">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setRDetails([]);
                                        setShowAddRoom(false);
                                    }}
                                ></button>
                            </div>
                        </div>

                        <div className="modal-body y_scrolling">
                            <div className="light-blue-box py-2 px-1 d-flex">
                                <div className="row m-0 w-100">
                                    <div className="col-3">Room Type</div>
                                    <div className="col-9 p-0">
                                        <div className="row mx-0">
                                            <div className="col-3">
                                                Room Plan
                                            </div>
                                            <div className="col-2">Room</div>
                                            <div className="col-2">Adult</div>
                                            <div className="col-2">Child</div>
                                            <div className="col-3 text-end">
                                                Rate (₹)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {rDetails.map((room, index) => (
                                <div className="row my-3 mx-0" key={index}>
                                    <div className="col-3">
                                        <div className="d-flex">
                                            <select
                                                className="form-select custom-input-sm"
                                                name="roomType"
                                                value={room.roomType}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        index,
                                                        'roomType',
                                                    )
                                                }
                                            >
                                                <option value="1">
                                                    Select
                                                </option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-9 p-0">
                                        <div className="row mx-0">
                                            <div className="col-3">
                                                <div className="d-flex">
                                                    <select
                                                        className="form-select custom-input-sm"
                                                        name="ratePlan"
                                                        value={room.ratePlan}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index,
                                                                'ratePlan',
                                                            )
                                                        }
                                                    >
                                                        <option value="1">
                                                            Select
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex">
                                                    <select
                                                        className="form-select custom-input-sm"
                                                        name="room"
                                                        value={room.room}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index,
                                                                'room',
                                                            )
                                                        }
                                                    >
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex">
                                                    <input
                                                        list="adult-list"
                                                        name="adult"
                                                        value={room.adult}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index,
                                                                'adult',
                                                            )
                                                        }
                                                        className="form-control custom-input"
                                                    />
                                                    <datalist
                                                        id="adult-list"
                                                        className="custom-input"
                                                    >
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                        <option value="4">
                                                            4
                                                        </option>
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex">
                                                    <input
                                                        list="child-list"
                                                        name="child"
                                                        value={room.child}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index,
                                                                'child',
                                                            )
                                                        }
                                                        className="form-control custom-input"
                                                    />
                                                    <datalist
                                                        id="child-list"
                                                        className="custom-input"
                                                    >
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                        <option value="4">
                                                            4
                                                        </option>
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div className="col-3 position-relative">
                                                <button
                                                    className="btn position-absolute start-1"
                                                    onClick={() =>
                                                        toggleEditPrice(index)
                                                    }
                                                >
                                                    <svg
                                                        width="17"
                                                        height="17"
                                                        viewBox="0 0 17 17"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.33854 1.49561C4.65854 1.49561 1.67188 4.48227 1.67188 8.16227C1.67188 11.8423 4.65854 14.8289 8.33854 14.8289C12.0185 14.8289 15.0052 11.8423 15.0052 8.16227C15.0052 4.48227 12.0185 1.49561 8.33854 1.49561ZM8.33854 13.4956C5.39854 13.4956 3.00521 11.1023 3.00521 8.16227C3.00521 5.22227 5.39854 2.82894 8.33854 2.82894C11.2785 2.82894 13.6719 5.22227 13.6719 8.16227C13.6719 11.1023 11.2785 13.4956 8.33854 13.4956ZM11.1185 10.0023L10.3852 9.26894C10.8585 8.38227 10.7385 7.26227 9.99187 6.51561C9.53188 6.05561 8.93854 5.82894 8.33854 5.82894C8.31854 5.82894 8.29854 5.83561 8.27854 5.83561L9.00521 6.56227L8.29854 7.26894L6.41187 5.38227L8.29854 3.49561L9.00521 4.20227L8.36521 4.84227C9.21187 4.84894 10.0519 5.16227 10.6985 5.80227C11.8319 6.94227 11.9719 8.70894 11.1185 10.0023ZM10.2652 10.9423L8.37854 12.8289L7.67188 12.1223L8.30521 11.4889C7.46521 11.4823 6.62521 11.1556 5.98521 10.5156C4.84521 9.37561 4.70521 7.61561 5.55854 6.32227L6.29188 7.05561C5.81854 7.94227 5.93854 9.06227 6.68521 9.80894C7.15188 10.2756 7.77187 10.5023 8.39188 10.4823L7.67188 9.76227L8.37854 9.05561L10.2652 10.9423Z"
                                                            fill="#899EB0"
                                                        />
                                                    </svg>
                                                </button>
                                                <input
                                                    type="number"
                                                    className="form-control custom-input-sm text-end"
                                                    name="rate"
                                                    value={room.rate}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            index,
                                                            'rate',
                                                        )
                                                    }
                                                    placeholder="1000.00"
                                                    disabled={
                                                        !isEditPrice[index]
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="row mx-0 my-2">
                                <div className="col-12 pt-0">
                                    <div className="button-container">
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={addRoom}
                                        >
                                            <span className="material-icons-outlined">
                                                add
                                            </span>
                                            Room
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setRDetails([]);
                                    setShowAddRoom(false);
                                }}
                            >
                                Cancle
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        roomDetails: rDetails,
                                    });
                                    setShowAddRoom(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddRoom;
