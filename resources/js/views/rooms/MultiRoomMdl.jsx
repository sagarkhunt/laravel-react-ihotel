import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import actions from '../../redux/Rooms/actions';
import { useDispatch, useSelector } from 'react-redux';

function MultiRoomMdl({ open, setOpen }) {
    const [dropDownData, setDropDownData] = useState([]);
    const [formData, setFormData] = useState({});
    const { dropDownList } = useSelector((state) => state?.roomReducer);
    const dispatch = useDispatch();
    const [showRoomNos, setShowRoomNos] = useState(false);

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const additionalFormData = showRoomNos
            ? {
                  m_room_prefix: formData.m_room_prefix,
                  m_room_suffix: formData.m_room_suffix,
                  m_start_no: formData.m_start_no,
                  m_to_no: formData.m_to_no,
                  m_rooms_name: '',
              }
            : { m_room_no: formData.m_room_no, m_rooms_name: 'room_name' };

        const updatedFormData = {
            ...formData,
            ...additionalFormData,
        };

        dispatch({
            type: actions.ROOMS_MULTIPLE_ADD,
            payload: updatedFormData,
        });
        setOpen(false);
    }
    useEffect(() => {
        setFormData({
            m_room_no: '',
            m_rooms_name: '',
            m_start_no: '',
            m_to_no: '',
            m_room_prefix: '',
            m_room_suffix: '',
            m_room_desc: '',
            m_room_cat_id: '',
            m_section_id: '',
            m_floor_id: '',
            status: 1,
        });
    }, [open]);

    useEffect(() => {
        setDropDownData(dropDownList);
    }, [dropDownList]);

    useEffect(() => {
        const sync_req = [
            'room_cate',
            'hotel_floor',
            'hotel_section',
            'rooms_view',
        ];

        dispatch({
            type: actions.ROOMS_DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','), // Convert the array to a comma-separated string
            },
        });
    }, []);

    return (
        <>
            <Modal open={open} handleModal={() => setOpen(!open)}>
                <div
                    className="modal fade right show"
                    id="add_room"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    style={{ display: 'block' }}
                    aria-modal="false"
                    role="dialog"
                >
                    <div className="modal-dialog modal-md modal-lf">
                        <form
                            id="formultirooms"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="modal-content modal-lf-container">
                                <div className="modal-header d-flex justify-content-between">
                                    <h5
                                        className="modal-title headline-h6m"
                                        id="multiRooms"
                                    >
                                        Add Multiple Rooms
                                    </h5>
                                    <div className="d-flex gap-4 align-items-center">
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setOpen(false)}
                                        ></button>
                                    </div>
                                </div>

                                <div className="modal-body modal-lf-body y_scrolling">
                                    <div className="row">
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                type="radio"
                                                id="radioCheckRoomName"
                                                name="m_rooms_name"
                                                onChange={() =>
                                                    setShowRoomNos(false)
                                                }
                                                value="room_name"
                                                className="custom-control-input"
                                                checked={!showRoomNos}
                                            />
                                            <label
                                                className="custom-control-label subtitle-2m ms-1"
                                                htmlFor="rooms_name"
                                            >
                                                Add Rooms Names*
                                            </label>
                                        </div>
                                        <div className="col-12">
                                            <div
                                                className="form-group"
                                                id="roomNo"
                                                style={{
                                                    display: showRoomNos
                                                        ? 'none'
                                                        : 'block',
                                                }}
                                            >
                                                <textarea
                                                    rows="3"
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="m_room_no"
                                                    name="m_room_no"
                                                    value={
                                                        formData.m_room_no || ''
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Add multiple room names using a comma ',' as the separator"
                                                ></textarea>
                                                <p className="caption-1 mb-0">
                                                    Add multiple room names
                                                    using a comma ',' as the
                                                    separator
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row m-0 my-3">
                                        <div className="col border-lb"></div>
                                        <div className="col-auto">
                                            <p className="body-2 mb-0">Or</p>
                                        </div>
                                        <div className="col border-lb"></div>
                                    </div>
                                    <div className="row">
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                type="radio"
                                                id="radioCheckRoomNos"
                                                name="m_rooms_name"
                                                onChange={() =>
                                                    setShowRoomNos(true)
                                                }
                                                value="room_nos"
                                                className="custom-control-input"
                                                checked={showRoomNos}
                                            />
                                            <label
                                                className="custom-control-label subtitle-2m ms-1"
                                                htmlFor="rooms_nos"
                                            >
                                                Add Room Nos*
                                            </label>
                                        </div>

                                        <div
                                            className={`col-6 roomNos ${showRoomNos ? 'd-block' : 'd-none'}`}
                                        >
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Prefix
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="m_room_prefix"
                                                    name="m_room_prefix"
                                                    value={
                                                        formData.m_room_prefix ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Prefix"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={`col-6 roomNos ${showRoomNos ? 'd-block' : 'd-none'}`}
                                        >
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Suffix{' '}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="m_room_suffix"
                                                    name="m_room_suffix"
                                                    value={
                                                        formData.m_room_suffix ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Suffix"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={`col-6 roomNos ${showRoomNos ? 'd-block' : 'd-none'}`}
                                        >
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Start No*{' '}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="m_start_no"
                                                    name="m_start_no"
                                                    value={
                                                        formData.m_start_no ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Start No"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={`col-6 roomNos ${showRoomNos ? 'd-block' : 'd-none'}`}
                                        >
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    To No*{' '}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="m_to_no"
                                                    name="m_to_no"
                                                    value={
                                                        formData.m_to_no || ''
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="To No"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row m-0 my-3">
                                        <div className="col border-lb"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Room Category*
                                                </label>
                                                <select
                                                    className="form-select custom-input"
                                                    aria-label=".form-select-sm example"
                                                    id="m_room_cat_id"
                                                    name="m_room_cat_id"
                                                    value={
                                                        formData.m_room_cat_id ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option>
                                                        Select Room Category
                                                    </option>
                                                    {dropDownData?.room_cate?.map(
                                                        (option) => (
                                                            <option
                                                                key={option.id}
                                                                value={
                                                                    option.id
                                                                }
                                                            >
                                                                {
                                                                    option.cat_name
                                                                }
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Room Section
                                                </label>
                                                <select
                                                    className="form-select custom-input "
                                                    aria-label=".form-select-sm example"
                                                    id="m_section_id"
                                                    name="m_section_id"
                                                    value={
                                                        formData.m_section_id ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">
                                                        Select Room Category
                                                    </option>
                                                    {dropDownData?.hotel_section?.map(
                                                        (option) => (
                                                            <option
                                                                key={option.id}
                                                                value={
                                                                    option.id
                                                                }
                                                            >
                                                                {option.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Floor
                                                </label>
                                                <select
                                                    className="form-select custom-input"
                                                    aria-label=".form-select-sm example"
                                                    id="m_floor_id"
                                                    name="m_floor_id"
                                                    value={
                                                        formData.m_floor_id ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">
                                                        Select Floor
                                                    </option>
                                                    {dropDownData?.hotel_floor?.map(
                                                        (option) => (
                                                            <option
                                                                key={option.id}
                                                                value={
                                                                    option.id
                                                                }
                                                            >
                                                                {option.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Room Details
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="m_room_desc"
                                                    name="m_room_desc"
                                                    placeholder="Room Details"
                                                    value={
                                                        formData.m_room_desc ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        data-bs-dismiss="modal"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default MultiRoomMdl;
