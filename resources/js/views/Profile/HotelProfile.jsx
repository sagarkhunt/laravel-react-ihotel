import React, { useRef, useState } from 'react';

function HotelProfile() {
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);
    const uploaderRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        uploaderRef.current.classList.add('dragover');
    };

    const handleDragLeave = () => {
        uploaderRef.current.classList.remove('dragover');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        uploaderRef.current.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        handleFileUpload(files);
    };

    const handleFileUpload = (files) => {
        if (files.length > 0) {
            const file = files[0];
            setFileName(file.name);

            document.getElementById('upload-image-label').style.display =
                'none';
            document.getElementById('image-dimension-label').style.display =
                'none';
        }
    };
    return (
        <div className="container-fluid" style={{ maxWidth: '680px' }}>
            <div className="d-flex gap-1 align-items-center my-2">
                <span className="body-2"> Dashboard </span>
                <span>/</span>
                <span className="subtitle-2m">Hotel Profile</span>
            </div>

            <div className="container-page p-3 mt-0">
                <h6 className="headline-h6m mb-0">Hotel Profile</h6>
            </div>

            <div className="container-page p-3 mb-5">
                <form>
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
                                    className="custom-input"
                                    style={{ borderWidth: '1px' }}
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
                                        style={{ display: 'none' }}
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
                                        style={{ display: 'none' }}
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
                                    className="w-100 custom-input"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="w-100 custom-input"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
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
                                    className="custom-input w-100"
                                    style={{ borderWidth: '1px' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer" style={{ border: 'none' }}>
                        <button type="button" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HotelProfile;
