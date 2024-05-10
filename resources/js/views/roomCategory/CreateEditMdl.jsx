import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/RoomCategory/actions';
import amntActions from '../../redux/Amenity/actions';
function CreateEditMdl({
    open,
    setOpen,
    mode,
    // onSubmit,
    cateData,
    statusValue,
    setStatusValue,
}) {
    const [amenities, setAmenities] = useState();

    const { amenityListData } = useSelector((state) => state?.amenityReducer);
    const dispatch = useDispatch();
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [formData, setFormData] = useState({});
    // Define handleChange function to update form data state
    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const [isExtraBedAllowed, setIsExtraBedAllowed] = useState(false);
    const [maxExtraBed, setMaxExtraBed] = useState('');

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsExtraBedAllowed(event.target.checked);
    };

    // Function to handle input change
    const handleInputChange = (event) => {
        setMaxExtraBed(event.target.value);
    };

    useEffect(() => {
        if (mode === 'Add Room Category') {
            // Clear form data for adding new user
            setFormData({
                cat_name: '',
                short_name: '',
                description: '',
                room_size: '',
                base_occu: '',
                max_occu: '',
                max_adult: '',
                max_child: '',
                max_extra_bed: '',
                base_rate: '',
                extra_person_charge: '',
                extra_bed_charge: '',
                status: 1,
            });
        } else {
            setStatusValue(cateData.status);
            setFormData(cateData); // Pre-fill form with user data for editing
            const roomAmntsIdsString = cateData.room_amnts_ids;
            // Check if amenities is defined, not null, and not empty
            if (amenities && Array.isArray(amenities) && amenities.length > 0) {
                // Check if roomAmntsIdsString is not null, undefined, or empty
                if (roomAmntsIdsString) {
                    const roomAmntsIdsArray = roomAmntsIdsString
                        .split(',')
                        .map((id) => parseInt(id, 10));

                    const selected = roomAmntsIdsArray
                        .map((item) => {
                            const matchedAmenity = amenities.find(
                                (amenity) => amenity && amenity.id === item,
                            );
                            return matchedAmenity;
                        })
                        .filter(Boolean); // Filter out any undefined values

                    // Set the selected amenities
                    setSelectedAmenities(selected);
                }
            }
        }
    }, [mode, cateData, amenities]);
    const toggleSelectAll = () => {
        if (amenities.length > 0) {
            // Check if any amenities are selected
            const anySelected = selectedAmenities.length > 0;

            if (anySelected) {
                // If any amenities are selected, unselect all
                setSelectedAmenities([]);
            } else {
                // Otherwise, select all amenities
                setSelectedAmenities(amenities.map((amenity) => amenity));
            }
        }
    };

    const toggleSelectAmenity = (amenity) => {
        const amenityId = amenity.id;

        if (
            selectedAmenities.some(
                (selectedAmenity) => selectedAmenity.id === amenityId,
            )
        ) {
            setSelectedAmenities(
                selectedAmenities.filter(
                    (selectedAmenity) => selectedAmenity.id == amenityId,
                ),
            );
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    // const isSelected = (amenityId) => selectedAmenities.includes(amenityId);
    const isSelected = (amenity) =>
        selectedAmenities.some(
            (selectedAmenity) => selectedAmenity.id === amenity.id,
        );

    const removeAmenity = (idToRemove) => {
        setSelectedAmenities(
            selectedAmenities.filter((amenity) => amenity.id !== idToRemove),
        );
    };
    /**
     * amenities
     */
    useEffect(() => {
        setAmenities(amenityListData);
    }, [amenityListData]);

    useEffect(() => {
        dispatch({
            type: amntActions.AMENITY_LIST,
        });
    }, []);
    if (!amenities || amenities.length === 0) {
        return <div>No amenities available</div>;
    }
    function handleSubmit(event) {
        event.preventDefault();

        const amenityIs = selectedAmenities
            .filter((obj) => obj.id)
            .map((obj) => obj.id);

        const room_amnts_ids = amenityIs.length > 0 ? amenityIs.join(',') : ' ';

        if (mode === 'Edit Room Category') {
            const updatedFormData = {
                id: formData.id,
                cat_name: formData.cat_name,
                short_name: formData.short_name,
                description: formData.description,
                room_size: formData.room_size,
                base_occu: formData.base_occu,
                max_occu: formData.max_occu,
                max_adult: formData.max_adult,
                max_child: formData.max_child,
                max_extra_bed: formData.max_extra_bed,
                base_rate: formData.base_rate,
                extra_person_charge: formData.extra_person_charge,
                extra_bed_charge: formData.extra_bed_charge,
                room_amnts_ids: room_amnts_ids,
                status: statusValue,
            };
            dispatch({
                type: actions.ROOMCATEGORY_UPDATE,
                payload: updatedFormData,
            });
        } else {
            dispatch({
                type: actions.ROOMCATEGORY_ADD,
                payload: formData,
            });
        }
        setOpen(false);
    }
    return (
        <>
            <Modal open={open} handleModal={() => setOpen(!open)}>
                <div
                    className="modal fade right show"
                    id="add_category"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    style={{ display: 'block' }}
                    aria-modal="false"
                    role="dialog"
                >
                    <div
                        className="modal-dialog modal-md modal-lf"
                        style={{ minHeight: '500px' }}
                    >
                        <form
                            id="formroomcat"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="hidden"
                                name="cat_id"
                                id="cat_id"
                                value="0"
                            />
                            <div className="modal-content modal-lf-container">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title headline-h6m"
                                        id="rctable_header"
                                    >
                                        {mode}
                                    </h5>
                                    <div className="d-flex gap-4 align-items-center">
                                        {mode === 'Edit Room Category' ? (
                                            <div className="d-flex gap-4 align-items-center">
                                                <div
                                                    className="form-check form-switch"
                                                    id="customSwitch"
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="status"
                                                        name="status"
                                                        checked={statusValue}
                                                        onChange={(e) => {
                                                            const newValue = e
                                                                .target.checked
                                                                ? 1
                                                                : 0;
                                                            setStatusValue(
                                                                newValue,
                                                            );
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="status"
                                                    >
                                                        Active
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setOpen(false)}
                                        ></button>
                                    </div>
                                </div>
                                <ul
                                    className="nav tab-nav nav-pills"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className="nav-link nav-link-custom active"
                                            data-bs-toggle="pill"
                                            href="#basicInfo"
                                        >
                                            Basic Info
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link nav-link-custom"
                                            data-bs-toggle="pill"
                                            href="#amenities"
                                        >
                                            Amenities
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link nav-link-custom"
                                            data-bs-toggle="pill"
                                            href="#rooms"
                                            // onClick="getRoomsOnRoomCatId()"
                                        >
                                            Rooms
                                        </a>
                                    </li>
                                </ul>

                                <div
                                    className="modal-body modal-lft-body"
                                    style={{ minWidth: '500px' }}
                                >
                                    <div className="tab-content ">
                                        <div
                                            id="basicInfo"
                                            className="container px-0 tab-pane active"
                                        >
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Room Category Name*{' '}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="cat_name"
                                                            name="cat_name"
                                                            value={
                                                                formData.cat_name ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            required
                                                            placeholder="Room Category Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Short Name*{' '}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="short_name"
                                                            name="short_name"
                                                            value={
                                                                formData.short_name ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            required
                                                            placeholder="Short Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Description
                                                        </label>
                                                        <textarea
                                                            rows="3"
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="description"
                                                            name="description"
                                                            placeholder="Description"
                                                            value={
                                                                formData.description ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Room Size
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="room_size"
                                                            name="room_size"
                                                            value={
                                                                formData.room_size ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="Ex 1200x1200 sq ft"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 ">
                                                    <p className="subtitle-2m  heading_box  primary-color">
                                                        Occupancy
                                                    </p>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Base Occupancy
                                                        </label>
                                                        <input
                                                            list="ice-cream-flavors"
                                                            id="base_occu"
                                                            name="base_occu"
                                                            value={
                                                                formData.base_occu ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="custom-input"
                                                        />
                                                        <datalist
                                                            id="ice-cream-flavors"
                                                            className="custom-input "
                                                        >
                                                            <option value="1"></option>
                                                            <option value="2"></option>
                                                            <option value="3"></option>
                                                            <option value="4"></option>
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Higher Occupancy
                                                        </label>

                                                        <input
                                                            list="ice-cream-flavors"
                                                            id="max_occu"
                                                            name="max_occu"
                                                            value={
                                                                formData.max_occu ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="custom-input"
                                                        />
                                                        <datalist
                                                            id="ice-cream-flavors"
                                                            className="custom-input "
                                                        >
                                                            <option value="1"></option>
                                                            <option value="2"></option>
                                                            <option value="3"></option>
                                                            <option value="4"></option>
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Max Adult
                                                        </label>

                                                        <input
                                                            list="ice-cream-flavors"
                                                            id="max_adult"
                                                            name="max_adult"
                                                            className="custom-input"
                                                            value={
                                                                formData.max_adult ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        <datalist
                                                            id="ice-cream-flavors"
                                                            className="custom-input "
                                                        >
                                                            <option value="1"></option>
                                                            <option value="2"></option>
                                                            <option value="3"></option>
                                                            <option value="4"></option>
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Max Child
                                                        </label>

                                                        <input
                                                            list="ice-cream-flavors"
                                                            id="max_child"
                                                            name="max_child"
                                                            className="custom-input"
                                                            value={
                                                                formData.max_child ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        <datalist
                                                            id="ice-cream-flavors"
                                                            className="custom-input "
                                                        >
                                                            <option value="1"></option>
                                                            <option value="2"></option>
                                                            <option value="3"></option>
                                                            <option value="4"></option>
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-1">
                                                    <div className="form-group  mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Extra Bed Allowed?
                                                        </label>
                                                        <div className="d-flex  mt-1 align-items-center">
                                                            <div className="custom-control me-2 custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="extra_bed_customCheck1"
                                                                    onChange={
                                                                        handleCheckboxChange
                                                                    }
                                                                />
                                                                <label
                                                                    className="custom-control-label body-1 ms-1"
                                                                    htmlFor="extra_bed_customCheck1"
                                                                >
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            {isExtraBedAllowed && (
                                                                <div>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control custom-input"
                                                                        style={{
                                                                            width: '60px',
                                                                        }}
                                                                        id="max_extra_bed"
                                                                        name="max_extra_bed"
                                                                        value={
                                                                            formData.max_extra_bed ||
                                                                            ''
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        placeholder=""
                                                                    />
                                                                </div>
                                                            )}
                                                            <p className="body-2 mb-0 ms-1">
                                                                extra beds
                                                                allowed
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 ">
                                                    <p className="subtitle-2m  heading_box  primary-color">
                                                        Rack Rate (List Price)
                                                    </p>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group position-relative mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Base Rate*
                                                        </label>
                                                        <span className="material-icons-outlined svg-rupee">
                                                            currency_rupee
                                                        </span>

                                                        <input
                                                            type="text"
                                                            className="form-control custom-input left-icon-input"
                                                            id="base_rate"
                                                            name="base_rate"
                                                            value={
                                                                formData.base_rate ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="0"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group position-relative mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Extra Person*
                                                        </label>
                                                        <span className="material-icons-outlined svg-rupee">
                                                            currency_rupee
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input left-icon-input"
                                                            id="extra_person_charge"
                                                            name="extra_person_charge"
                                                            value={
                                                                formData.extra_person_charge ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="0"
                                                            required
                                                        />
                                                        <p className="caption-1 mb-0 ">
                                                            (Upcharge per
                                                            Additional Person)
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group position-relative mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Extra Bed
                                                        </label>
                                                        <span className="material-icons-outlined svg-rupee">
                                                            currency_rupee
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input left-icon-input"
                                                            id="extra_bed_charge"
                                                            name="extra_bed_charge"
                                                            value={
                                                                formData.extra_bed_charge ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="amenities"
                                            className="container tab-pane fade"
                                        >
                                            <div className="row associate_box ">
                                                <div className="col-12 ">
                                                    <p className="subtitle-2m mb-0">
                                                        <span id="countAmenity">
                                                            {selectedAmenities.length ??
                                                                0}
                                                        </span>
                                                        Associated Amenities
                                                    </p>
                                                    <p className="body-2 mb-0">
                                                        Add Amenities associated
                                                        with this Room Category
                                                    </p>
                                                </div>
                                                <input
                                                    type="hidden"
                                                    name="room_amnts_ids"
                                                    id="room_amnts_ids"
                                                    value=""
                                                />
                                                <div className="col-12 mt-4">
                                                    <div id="selectdAmenity">
                                                        {selectedAmenities.map(
                                                            (
                                                                amenity,
                                                                index,
                                                            ) => (
                                                                <div
                                                                    className="d-inline-flex flex-wrap"
                                                                    key={index}
                                                                >
                                                                    <div className="chip me-2 mb-2">
                                                                        <span className="material-icons-outlined icon-chip">
                                                                            {
                                                                                amenity.amnt_icon
                                                                            }
                                                                        </span>
                                                                        {
                                                                            amenity.amnt
                                                                        }
                                                                        <button
                                                                            type="button"
                                                                            className="btn-close"
                                                                            aria-label="Close"
                                                                            onClick={() =>
                                                                                removeAmenity(
                                                                                    amenity.id,
                                                                                )
                                                                            }
                                                                        ></button>
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                    <div className="d-inline-flex flex-wrap"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="row mt-4">
                                                    <div className="col-6 p-0">
                                                        <p className="subtitle-2m">
                                                            Selected Amenities:
                                                            {
                                                                selectedAmenities.length
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-6 p-0 text-end">
                                                        <p
                                                            className="a-btn-link"
                                                            onClick={
                                                                toggleSelectAll
                                                            }
                                                        >
                                                            {selectedAmenities.length ===
                                                            amenities.length
                                                                ? 'Unselect all'
                                                                : 'Select all'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div id="amenityList">
                                                    {amenities &&
                                                    amenities.length > 0 ? (
                                                        amenities.map(
                                                            (amenity) => (
                                                                <div
                                                                    key={
                                                                        amenity.id
                                                                    }
                                                                    className={`row listing_box cp selecteItem_${amenity.id} ${
                                                                        isSelected(
                                                                            amenity,
                                                                        )
                                                                            ? 'disable'
                                                                            : ''
                                                                    }`}
                                                                    data-id={
                                                                        amenity.id
                                                                    }
                                                                    data-icon={
                                                                        amenity.amnt_icon
                                                                    }
                                                                    data-amnt={
                                                                        amenity.amnt
                                                                    }
                                                                    onClick={() =>
                                                                        toggleSelectAmenity(
                                                                            amenity,
                                                                        )
                                                                    }
                                                                >
                                                                    <div className="col d-flex align-items-center">
                                                                        <span className="material-icons-outlined aminites_icon">
                                                                            {
                                                                                amenity.amnt_icon
                                                                            }
                                                                        </span>
                                                                        <p className="subtitle-2m mb-0 ms-2">
                                                                            {
                                                                                amenity.amnt
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-auto">
                                                                        <button
                                                                            type="button"
                                                                            className={`btn btn-secondary-add ${
                                                                                isSelected(
                                                                                    amenity.id,
                                                                                )
                                                                                    ? 'selected'
                                                                                    : ''
                                                                            }`}
                                                                        >
                                                                            <span className="material-icons-outlined">
                                                                                add
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )
                                                    ) : (
                                                        <p>
                                                            No amenities
                                                            available
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="rooms"
                                            className="container tab-pane fade"
                                        >
                                            <div className="row associate_box ">
                                                <div className="col-12 ">
                                                    <div className=""></div>
                                                    <p className="subtitle-2m mb-0">
                                                        <span id="roomCateCount">
                                                            20{' '}
                                                        </span>{' '}
                                                        Associated Rooms
                                                    </p>
                                                    <p className="body-2 mb-0">
                                                        Rooms associated with
                                                        this Room Category
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-12 p-0 mt-4">
                                                    <div id="roomCateList"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        data-bs-dismiss="modal"
                                        // onClick="reset_field()"
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

export default CreateEditMdl;
