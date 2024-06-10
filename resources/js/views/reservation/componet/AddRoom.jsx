import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

const AddRoom = ({
    formData,
    showAddRoom,
    setShowAddRoom,

    setFormData,
}) => {
    const addRoom = () => {
        setRDetails([
            ...rDetails,
            {
                roomType: '1',
                ratePlan: '1',
                room: '1',
                adult: '2',
                child: '1',
                rate: '0.00',
            },
        ]);
    };
    const rooms = structuredClone(formData.roomDetails);
    const [rDetails, setRDetails] = useState(rooms);

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
                                                Rate Plan
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
                                                className="form-select custom-input-sm "
                                                name="roomType"
                                                value={room.roomType}
                                                onChange={(e) => {
                                                    const newRoomDetails = [
                                                        ...rDetails,
                                                    ];
                                                    newRoomDetails[
                                                        index
                                                    ].roomType = e.target.value;
                                                    setRDetails(newRoomDetails);
                                                }}
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
                                                        onChange={(e) => {
                                                            const newRoomDetails =
                                                                [...rDetails];
                                                            newRoomDetails[
                                                                index
                                                            ].ratePlan =
                                                                e.target.value;
                                                            setRDetails(
                                                                newRoomDetails,
                                                            );
                                                        }}
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
                                                        onChange={(e) => {
                                                            const newRoomDetails =
                                                                [...rDetails];
                                                            newRoomDetails[
                                                                index
                                                            ].room =
                                                                e.target.value;
                                                            setRDetails(
                                                                newRoomDetails,
                                                            );
                                                        }}
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
                                                    <select
                                                        className="form-select custom-input-sm"
                                                        name="adult"
                                                        value={room.adult}
                                                        onChange={(e) => {
                                                            const newRoomDetails =
                                                                [...rDetails];
                                                            newRoomDetails[
                                                                index
                                                            ].adult =
                                                                e.target.value;
                                                            setRDetails(
                                                                newRoomDetails,
                                                            );
                                                        }}
                                                    >
                                                        <option value="1">
                                                            2
                                                        </option>
                                                        <option value="2">
                                                            3
                                                        </option>
                                                        <option value="3">
                                                            4
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex">
                                                    <select
                                                        className="form-select custom-input-sm"
                                                        name="child"
                                                        value={room.child}
                                                        onChange={(e) => {
                                                            const newRoomDetails =
                                                                [...rDetails];
                                                            newRoomDetails[
                                                                index
                                                            ].child =
                                                                e.target.value;
                                                            setRDetails(
                                                                newRoomDetails,
                                                            );
                                                        }}
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
                                            <div className="col-3">
                                                <input
                                                    type="text"
                                                    className="form-control custom-input-sm"
                                                    name="rate"
                                                    value={room.rate}
                                                    onChange={(e) => {
                                                        const newRoomDetails = [
                                                            ...rDetails,
                                                        ];
                                                        newRoomDetails[
                                                            index
                                                        ].rate = e.target.value;
                                                        setRDetails(
                                                            newRoomDetails,
                                                        );
                                                    }}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="custom-row">
                                <div className="td-custom td-custom-p pt-0">
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
