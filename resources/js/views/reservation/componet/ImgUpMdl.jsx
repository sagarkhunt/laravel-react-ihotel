import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

const ImgUpMdl = ({ showImgMdl, setShowImgMdl }) => {
    const [frontImages, setFrontImages] = useState([]);
    const [backImages, setBackImages] = useState([]);

    const previewImage = (event, setImages) => {
        const files = Array.from(event.target.files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setImages(imagePreviews);
    };
    return (
        <Modal open={showImgMdl} handleModal={() => setShowImgMdl(!showImgMdl)}>
            <div
                className="modal fade show"
                id="uploadImages"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog d-flex justify-content-center align-items-center modal-md"
                    style={{ height: 'calc(100vh - 100px)' }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Upload Guest Id
                            </h5>
                            <div className="d-flex gap-4 align-items-center">
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowImgMdl(false)}
                                ></button>
                            </div>
                        </div>
                        <div className="modal-body d-flex flex-column w-100">
                            <div className="row mt-2">
                                <div className="col">
                                    <div className="mb-2 body-2">
                                        Front Side
                                    </div>
                                    <div className="Neon-input-dragDrop d-flex text-center flex-column align-items-center">
                                        <span className="material-icons-outlined primary-icon blue_colour upload-button mt-2">
                                            upload
                                        </span>
                                        <label
                                            className="upload-button upload-image"
                                            htmlFor="filer_input2"
                                        >
                                            <span className="mt-2 subtitle-2m">
                                                Upload Images
                                            </span>
                                        </label>
                                        <input
                                            name="files[]"
                                            id="filer_input2"
                                            multiple
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                previewImage(e, setFrontImages)
                                            }
                                            style={{ display: 'none' }}
                                        />
                                        <div
                                            id="frontPreview"
                                            className="image-preview mt-2"
                                        >
                                            {frontImages.map((src, index) => (
                                                <img
                                                    key={index}
                                                    src={src}
                                                    alt={`front-preview-${index}`}
                                                    className="img-thumbnail"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-2 body-2">Back Side</div>
                                    <div className="Neon-input-dragDrop d-flex text-center flex-column align-items-center">
                                        <span className="material-icons-outlined primary-icon blue_colour upload-button mt-2">
                                            upload
                                        </span>
                                        <label
                                            className="upload-button upload-image"
                                            htmlFor="filer_input3"
                                        >
                                            <span className="mt-2 subtitle-2m">
                                                Upload Images
                                            </span>
                                        </label>
                                        <input
                                            name="files[]"
                                            id="filer_input3"
                                            multiple
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                previewImage(e, setBackImages)
                                            }
                                            style={{ display: 'none' }}
                                        />
                                        <div
                                            id="backPreview"
                                            className="image-preview mt-2"
                                        >
                                            {backImages.map((src, index) => (
                                                <img
                                                    key={index}
                                                    src={src}
                                                    alt={`back-preview-${index}`}
                                                    className="img-thumbnail"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => setShowImgMdl(false)}
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ImgUpMdl;
