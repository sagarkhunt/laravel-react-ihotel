import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../redux/Users/actions';

function HotelProfile() {
    const [fileName, setFileName] = useState('');
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        hotelName: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        mobileNo: '',
        email: '',
        noOfRooms: '',
        website: '',
        sameAsAbove: false,
        billingAddress: '',
        billingCountry: '',
        billingState: '',
        billingCity: '',
        billingZipCode: '',
        billingMobileNo: '',
        billingEmail: '',
        billingContactName: '',
        billingContactDesignation: '',
        billingContactOfficePhone: '',
        billingContactMobileNo: '',
        billingContactEmail: '',
        companyLogo: null,
        hotelPhotos: [],
    });

    const fileInputRef = useRef(null);
    const hotelPhotosInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, sameAsAbove: checked });
        if (checked) {
            setFormData({
                ...formData,
                billingAddress: formData.address,
                billingCountry: formData.country,
                billingState: formData.state,
                billingCity: formData.city,
                billingZipCode: formData.zipCode,
                billingMobileNo: formData.mobileNo,
                billingEmail: formData.email,
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, companyLogo: file });
    };

    const handleMultipleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevState) => ({
            ...prevState,
            hotelPhotos: [...prevState.hotelPhotos, ...files],
        }));
    };

    const removeFile = () => {
        setFormData({ ...formData, companyLogo: null });
        fileInputRef.current.value = '';
    };

    const removeHotelPhoto = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            hotelPhotos: prevState.hotelPhotos.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'hotelPhotos') {
                formData.hotelPhotos.forEach((photo, index) => {
                    formDataToSend.append(`hotelPhotos[${index}]`, photo);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            console.log(formDataToSend, '======');
            dispatch({
                type: actions.PROFILE_UPDATE,
                payload: formDataToSend,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div className="container-fluid width-680">
            <div className="d-flex gap-1 align-items-center my-2">
                <span className="body-2"> Dashboard </span>
                <span>/</span>
                <span className="subtitle-2m">Hotel Profile</span>
            </div>

            <div className="container-page p-3 mt-0">
                <h6 className="headline-h6m mb-0">Hotel Profile</h6>
            </div>

            <div className="container-page p-3 mb-0">
                {/* <form>
                    <div>
                        <div className="p-3 light-blue-box">USER INFO</div>

                        <div className="row my-3">
                            <div className="col-12 d-flex flex-column">
                                <label
                                    htmlFor="hotel_name"
                                    className="body-2 pb-1"
                                >
                                    Hotel Name
                                </label>
                                <input
                                    type="text"
                                    className="custom-input border-width-1"
                                    placeholder="Hotel Name"
                                />
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-4">
                                <label
                                    htmlFor="hotel_name"
                                    className="body-2 pb-1"
                                >
                                    Upload Company Logo
                                </label>
                                <div
                                    id="uploader1"
                                    ref={uploaderRef}
                                    className="uploader"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={handleClick}
                                >
                                    <svg
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 16.9121H15V10.9121H19L12 3.91211L5 10.9121H9V16.9121ZM12 6.74211L14.17 8.91211H13V14.9121H11V8.91211H9.83L12 6.74211ZM5 18.9121H19V20.9121H5V18.9121Z"
                                            fill="#0863B5"
                                        />
                                    </svg>
                                    <p
                                        id="upload-image-label"
                                        className="subtitle-2m my-2"
                                    >
                                        Upload Image
                                    </p>
                                    <p
                                        id="image-dimension-label"
                                        className="caption-1"
                                    >
                                        Image Dimensions 300px x 225px
                                    </p>
                                    <p id="file-name1">{fileName || ''}</p>
                                    <input
                                        type="file"
                                        id="file-input1"
                                        ref={fileInputRef}
                                        className="d-none"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-12">
                                <label
                                    htmlFor="hotel_name"
                                    className="body-2 pb-1"
                                >
                                    Upload Hotel Photos
                                </label>
                                <div className="uploader" id="uploader">
                                    <svg
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 16.9121H15V10.9121H19L12 3.91211L5 10.9121H9V16.9121ZM12 6.74211L14.17 8.91211H13V14.9121H11V8.91211H9.83L12 6.74211ZM5 18.9121H19V20.9121H5V18.9121Z"
                                            fill="#0863B5"
                                        />
                                    </svg>
                                    <p
                                        id="upload-image-label"
                                        className="subtitle-2m my-2"
                                    >
                                        Upload Hotel Photos
                                    </p>
                                    <p
                                        id="image-dimension-label"
                                        className="caption-1"
                                    >
                                        Image Dimensions 300px x 225px
                                    </p>
                                    <p className="file-name" id="file-name"></p>
                                    <input
                                        type="file"
                                        id="file-input"
                                        className="d-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-12">
                                <label
                                    htmlFor="hotel_name"
                                    className="body-2 pb-1"
                                >
                                    Address
                                </label>
                                <textarea
                                    name="hotel_address"
                                    id="hotel_address"
                                    className="w-100 custom-input border-width-1"
                                    rows="5"
                                    placeholder="Address"
                                ></textarea>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="hotel_name"
                                    className="body-2 pb-1"
                                >
                                    Country
                                </label>
                                <select
                                    name="country"
                                    id="country"
                                    className="custom-input w-100 border-width-1"
                                    aria-placeholder="Country"
                                >
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="state" className="body-2 pb-1">
                                    State
                                </label>
                                <select
                                    name="state"
                                    id="state"
                                    className="custom-input w-100 border-width-1"
                                    aria-placeholder="State"
                                >
                                    <option value="gujarat">Gujarat</option>
                                    <option value="rajasthan">Rajasthan</option>
                                    <option value="maharastra">
                                        Maharastra
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label htmlFor="city" className="body-2 pb-1">
                                    City
                                </label>
                                <select
                                    name="city"
                                    id="city"
                                    className="custom-input w-100 border-width-1"
                                    aria-placeholder="City"
                                >
                                    <option value="banglore">Banglore</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="ahmedabad">Ahmedabad</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="zip_code"
                                    className="body-2 pb-1"
                                >
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    name="zip_code"
                                    placeholder="Zip Code"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="mobile_no"
                                    className="body-2 pb-1"
                                >
                                    Mobile No
                                </label>
                                <input
                                    type="text"
                                    name="mobile_no"
                                    placeholder="Mobile No"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="email" className="body-2 pb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="no_of_rooms"
                                    className="body-2 pb-1"
                                >
                                    No of Rooms
                                </label>
                                <input
                                    type="number"
                                    name="no_of_rooms"
                                    placeholder="No of Rooms"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="website"
                                    className="body-2 pb-1"
                                >
                                    Website
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="Website"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="p-3 light-blue-box">
                            MAIN BILLING ADDRESS
                        </div>

                        <div className="row my-3">
                            <div className="col-12 d-flex align-items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="same_as_above"
                                    id="same_as_above"
                                    className="custom-control-input custom-input"
                                />
                                <label
                                    htmlFor="same_as_above"
                                    className="custom-control-label body-2"
                                >
                                    Same as above
                                </label>
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-12">
                                <label
                                    htmlFor="hotel_name"
                                    className="body-2 pb-1"
                                >
                                    Address
                                </label>
                                <textarea
                                    name="hotel_address"
                                    id="hotel_address"
                                    className="w-100 custom-input border-width-1"
                                    rows="5"
                                    placeholder="Address"
                                ></textarea>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="hotel_name"
                                    className="body-2 pb-1"
                                >
                                    Country
                                </label>
                                <select
                                    name="country"
                                    id="country"
                                    className="custom-input w-100 border-width-1"
                                    aria-placeholder="Country"
                                >
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="state" className="body-2 pb-1">
                                    State
                                </label>
                                <select
                                    name="state"
                                    id="state"
                                    className="custom-input w-100 border-width-1"
                                    aria-placeholder="State"
                                >
                                    <option value="gujarat">Gujarat</option>
                                    <option value="rajasthan">Rajasthan</option>
                                    <option value="maharastra">
                                        Maharastra
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label htmlFor="city" className="body-2 pb-1">
                                    City
                                </label>
                                <select
                                    name="city"
                                    id="city"
                                    className="custom-input w-100 border-width-1"
                                    aria-placeholder="City"
                                >
                                    <option value="banglore">Banglore</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="ahmedabad">Ahmedabad</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="zip_code"
                                    className="body-2 pb-1"
                                >
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    name="zip_code"
                                    placeholder="Zip Code"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="mobile_no"
                                    className="body-2 pb-1"
                                >
                                    Mobile No
                                </label>
                                <input
                                    type="text"
                                    name="mobile_no"
                                    placeholder="Mobile No"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="email" className="body-2 pb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="p-3 light-blue-box">
                            MAIN BILLING CONTACT
                        </div>

                        <div className="row my-3">
                            <div className="col-12 d-flex flex-column">
                                <label htmlFor="name" className="body-2 pb-1">
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="custom-input w-100 border-width-1"
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6 d-flex flex-column">
                                <label
                                    htmlFor="designation"
                                    className="body-2 pb-1"
                                >
                                    Designation*
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    className="custom-input w-100 border-width-1"
                                    placeholder="Designation"
                                />
                            </div>
                            <div className="col-6 d-flex flex-column">
                                <label
                                    htmlFor="office_phone"
                                    className="body-2 pb-1"
                                >
                                    Office Phone*
                                </label>
                                <input
                                    type="tel"
                                    name="office_phone"
                                    className="custom-input w-100 border-width-1"
                                    placeholder="Office Phone"
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="mobile_no"
                                    className="body-2 pb-1"
                                >
                                    Mobile No*
                                </label>
                                <input
                                    type="text"
                                    name="mobile_no"
                                    placeholder="Mobile No"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="email" className="body-2 pb-1">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="custom-input w-100 border-width-1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer" style={{ border: 'none' }}>
                        <button type="button" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form> */}
                <form onSubmit={handleSubmit}>
                    {/* Hotel Information */}
                    <div className="p-3 light-blue-box">User Info</div>
                    <div className="row my-3">
                        <div className="col-12">
                            <label htmlFor="hotelName" className="body-2 pb-1">
                                Hotel Name*
                            </label>
                            <input
                                type="text"
                                name="hotelName"
                                placeholder="Hotel Name"
                                className="custom-input w-100 border-width-1"
                                value={formData.hotelName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Company Logo Upload */}
                    <div className="row my-3">
                        <div className="col-4">
                            <label
                                htmlFor="companyLogo"
                                className="body-2 pb-1"
                            >
                                Upload Company Logo
                            </label>
                            <div
                                id="uploader1"
                                // ref={uploaderRef}
                                className="uploader"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <svg
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 16.9121H15V10.9121H19L12 3.91211L5 10.9121H9V16.9121ZM12 6.74211L14.17 8.91211H13V14.9121H11V8.91211H9.83L12 6.74211ZM5 18.9121H19V20.9121H5V18.9121Z"
                                        fill="#0863B5"
                                    />
                                </svg>
                                <p
                                    id="upload-image-label"
                                    className="subtitle-2m my-2"
                                >
                                    Upload Image
                                </p>
                                <p
                                    id="image-dimension-label"
                                    className="caption-1"
                                >
                                    Image Dimensions 300px x 225px
                                </p>
                                <p id="file-name1">
                                    {formData.companyLogo?.name || ''}
                                </p>
                                <input
                                    type="file"
                                    name="companyLogo"
                                    ref={fileInputRef}
                                    className="d-none"
                                    onChange={handleFileChange}
                                    required
                                />
                                {formData.companyLogo && (
                                    <button
                                        type="button"
                                        className="btn btn-danger mt-2"
                                        onClick={removeFile}
                                    >
                                        Remove Image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Hotel Photos Upload */}
                    <div className="row my-3">
                        <div className="col-12">
                            <label
                                htmlFor="hotelPhotos"
                                className="body-2 pb-1"
                            >
                                Upload Hotel Photos
                            </label>
                            <div
                                className="uploader"
                                id="uploader"
                                onClick={() =>
                                    hotelPhotosInputRef.current.click()
                                }
                            >
                                <svg
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 16.9121H15V10.9121H19L12 3.91211L5 10.9121H9V16.9121ZM12 6.74211L14.17 8.91211H13V14.9121H11V8.91211H9.83L12 6.74211ZM5 18.9121H19V20.9121H5V18.9121Z"
                                        fill="#0863B5"
                                    />
                                </svg>
                                <p
                                    id="upload-image-label"
                                    className="subtitle-2m my-2"
                                >
                                    Upload Hotel Photos
                                </p>
                                <p
                                    id="image-dimension-label"
                                    className="caption-1"
                                >
                                    Image Dimensions 300px x 225px
                                </p>
                                <input
                                    type="file"
                                    id="file-input"
                                    name="hotelPhotos"
                                    ref={hotelPhotosInputRef}
                                    multiple
                                    className="d-none"
                                    onChange={handleMultipleFileChange}
                                />
                            </div>
                            <div className="mt-2">
                                {formData.hotelPhotos.length > 0 && (
                                    <div className="row">
                                        {formData.hotelPhotos.map(
                                            (photo, index) => (
                                                <div
                                                    key={index}
                                                    className="col-3 mb-3"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(
                                                            photo,
                                                        )}
                                                        alt={`Hotel Photo ${index + 1}`}
                                                        className="img-thumbnail"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm mt-1"
                                                        onClick={() =>
                                                            removeHotelPhoto(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12">
                            <label htmlFor="address" className="body-2 pb-1">
                                Address*
                            </label>
                            <textarea
                                name="address"
                                id="address"
                                className="w-100 custom-input border-width-1"
                                rows="5"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                    </div>
                    {/* Country, State, City, Zip Code */}
                    <div className="row my-3">
                        <div className="col-6">
                            <label htmlFor="country" className="body-2 pb-1">
                                Country
                            </label>
                            <select
                                name="country"
                                id="country"
                                className="form-select custom-input w-100 border-width-1"
                                value={formData.country}
                                onChange={handleInputChange}
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="state" className="body-2 pb-1">
                                State
                            </label>
                            <select
                                name="state"
                                id="state"
                                className="form-select custom-input w-100 border-width-1"
                                value={formData.state}
                                onChange={handleInputChange}
                            >
                                <option value="gujarat">Gujarat</option>
                                <option value="rajasthan">Rajasthan</option>
                                <option value="maharastra">Maharastra</option>
                            </select>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-6">
                            <label htmlFor="city" className="body-2 pb-1">
                                City
                            </label>
                            <select
                                name="city"
                                id="city"
                                className="form-select custom-input w-100 border-width-1"
                                value={formData.city}
                                onChange={handleInputChange}
                            >
                                <option value="banglore">Banglore</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="ahmedabad">Ahmedabad</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="zipCode" className="body-2 pb-1">
                                Zip Code
                            </label>
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="Zip Code"
                                className="custom-input w-100 border-width-1"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* Mobile No, Email */}
                    <div className="row my-3">
                        <div className="col-6">
                            <label htmlFor="mobileNo" className="body-2 pb-1">
                                Mobile No
                            </label>
                            <input
                                type="number"
                                name="mobileNo"
                                placeholder="Mobile No"
                                className="custom-input w-100 border-width-1"
                                value={formData.mobileNo}
                                onChange={handleInputChange}
                                minLength={10} // Set minimum length for validation
                                pattern="[0-9]+" // Optional pattern for numeric input
                                title={`Mobile number must be at least ${10} digits`}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="email" className="body-2 pb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="custom-input w-100 border-width-1"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {/* No of Rooms, Website */}
                    <div className="row my-3">
                        <div className="col-6">
                            <label htmlFor="noOfRooms" className="body-2 pb-1">
                                No of Rooms
                            </label>
                            <input
                                type="number"
                                name="noOfRooms"
                                placeholder="No of Rooms"
                                className="custom-input w-100 border-width-1"
                                value={formData.noOfRooms}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="website" className="body-2 pb-1">
                                Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                placeholder="Website"
                                className="custom-input w-100 border-width-1"
                                value={formData.website}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div>
                        <div className="p-3 light-blue-box">
                            BILLING INFORMATION
                        </div>
                        <div className="row my-3">
                            <div className="col-12 d-flex">
                                <label
                                    htmlFor="sameAsAbove"
                                    className="body-2 pb-1"
                                >
                                    <input
                                        type="checkbox"
                                        name="sameAsAbove"
                                        checked={formData.sameAsAbove}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className="px-2">Same as Above</span>
                                </label>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="billingAddress"
                                    className="body-2 pb-1"
                                >
                                    Address*
                                </label>
                                <input
                                    type="text"
                                    name="billingAddress"
                                    placeholder="Address"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingAddress}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="billingCountry"
                                    className="body-2 pb-1"
                                >
                                    Country
                                </label>
                                <select
                                    name="billingCountry"
                                    id="billingCountry"
                                    className="form-select custom-input w-100 border-width-1"
                                    value={formData.billingCountry}
                                    onChange={handleInputChange}
                                >
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="billingState"
                                    className="body-2 pb-1"
                                >
                                    State
                                </label>
                                <select
                                    name="billingState"
                                    id="billingState"
                                    className="form-select custom-input w-100 border-width-1"
                                    value={formData.billingState}
                                    onChange={handleInputChange}
                                >
                                    <option value="gujarat">Gujarat</option>
                                    <option value="rajasthan">Rajasthan</option>
                                    <option value="maharastra">
                                        Maharastra
                                    </option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="billingCity"
                                    className="body-2 pb-1"
                                >
                                    City
                                </label>
                                <select
                                    name="billingCity"
                                    id="billingCity"
                                    className="form-select custom-input w-100 border-width-1"
                                    value={formData.billingCity}
                                    onChange={handleInputChange}
                                >
                                    <option value="banglore">Banglore</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="ahmedabad">Ahmedabad</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="billingZipCode"
                                    className="body-2 pb-1"
                                >
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    name="billingZipCode"
                                    placeholder="Zip Code"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingZipCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="billingMobileNo"
                                    className="body-2 pb-1"
                                >
                                    Mobile No
                                </label>
                                <input
                                    type="number"
                                    name="billingMobileNo"
                                    placeholder="Mobile No"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingMobileNo}
                                    onChange={handleInputChange}
                                    minLength={10} // Set minimum length for validation
                                    pattern="[0-9]+" // Optional pattern for numeric input
                                    title={`Mobile number must be at least ${10} digits`}
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="billingEmail"
                                    className="body-2 pb-1"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="billingEmail"
                                    placeholder="Email"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingEmail}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Contact Information */}
                    <div>
                        <div className="p-3 light-blue-box">
                            CONTACT INFORMATION
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="billingContactName"
                                    className="body-2 pb-1"
                                >
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    name="billingContactName"
                                    placeholder="Name"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingContactName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="billingContactDesignation"
                                    className="body-2 pb-1"
                                >
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="billingContactDesignation"
                                    placeholder="Designation"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingContactDesignation}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label
                                    htmlFor="billingContactOfficePhone"
                                    className="body-2 pb-1"
                                >
                                    Office Phone
                                </label>
                                <input
                                    type="text"
                                    name="billingContactOfficePhone"
                                    placeholder="Office Phone"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingContactOfficePhone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="billingContactMobileNo"
                                    className="body-2 pb-1"
                                >
                                    Mobile No*
                                </label>
                                <input
                                    type="text"
                                    name="billingContactMobileNo"
                                    placeholder="Mobile No"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingContactMobileNo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    htmlFor="billingContactEmail"
                                    className="body-2 pb-1"
                                >
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    name="billingContactEmail"
                                    placeholder="Email"
                                    className="custom-input w-100 border-width-1"
                                    value={formData.billingContactEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer" style={{ border: 'none' }}>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HotelProfile;
