import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import CreateEditMdl from './CreateEditMdl';
import actions from '../../redux/Inquiry/actions';

function Inquiry() {
    const [listingData, setListingData] = useState([]);
    const dispatch = useDispatch();
    const { inquiryListData, inquiryCreated, inquiryUpdate } = useSelector(
        (state) => state.inquiryReducer,
    );
    const [statusValue, setStatusValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Inquiry Type'); // 'add' or 'edit'
    const [floorData, setFloorData] = useState(null); // Data of user being edited
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left' },
        {
            data: null,
            title: `<span class="dt-column-title">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" htmlFor="customCheck1"></label>
                </div>
            </span>`,
            className: 'action-check',
            render: () =>
                `
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheckAll">
                    <label class="custom-control-label" htmlFor="customCheckAll"></label>
                </div>
                `,
        },
        { data: 'inq_type', label: 'Inquiry Type' },
        { data: 'inq_desc', label: 'Description' },
        {
            data: 'status',
            label: 'Status',
            render: function (data, type, row) {
                if (data === 1) {
                    return '<div class="status-active">Active</div>';
                } else {
                    return '<div class="status-deactive">Deactive</div>';
                }
            },
        },
        {
            data: null,
            label: 'Action',
            render: () =>
                `
            <span class="material-icons-outlined delete-table">
                cancel_presentation
            </span>
            <span class="material-icons-outlined edit-table">
                edit
            </span>
            `,
        },
    ];
    /***
     * @param{handleAddFloor}
     */
    function handleAddFloor() {
        setMode('Add Inquiry Type');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditFloor} user
     */
    function handleEditFloor(user) {
        setMode('Edit Inquiry Type');
        setFloorData(user);
        setOpen(true);
    }
    /**
     *
     * @param {handleSubmit} formData
     */

    function handleSubmit(formData) {
        console.log('🚀 ~ handleSubmit ~ formData:', formData);
        // Handle form submission based on mode (add or edit)
        if (mode === 'Add Inquiry Type') {
            dispatch({
                type: actions.INQUIRY_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                inq_type: formData.inq_type,
                inq_desc: formData.inq_type,
                inq_type_id: formData.id, // Add user_id to formData
                status: statusValue,
            };

            dispatch({
                type: actions.INQUIRY_UPDATE,
                payload: updatedFormData,
            });
        }
        setOpen(false);
    }
    useEffect(() => {
        setListingData(inquiryListData);
    }, [inquiryListData]);
    useEffect(() => {
        dispatch({
            type: actions.INQUIRY_LIST,
        });
    }, [inquiryCreated, inquiryUpdate]);
    return (
        <>
            <div className="container-fluid py-3 px-4">
                <div className="row m-0">
                    <div className="col-12 p-0">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-2">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Inquiry Types Master</a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12  action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0 ">
                                    Inquiry Types List
                                </h5>
                            </div>
                            <div className="col-8 gap-3 action-right">
                                <button
                                    className="btn btn-primary d-flex "
                                    onClick={handleAddFloor}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    New Inquiry Types
                                </button>

                                <button className="btn btn-outline d-flex">
                                    <span className="material-icons-outlined">
                                        delete
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 p-3 container-page">
                        <DataTableComponent
                            data={listingData}
                            onEdit={handleEditFloor}
                            columnsConfig={columnsConfig}
                        />
                    </div>
                </div>
                {open && (
                    <CreateEditMdl
                        open={open}
                        setOpen={setOpen}
                        mode={mode}
                        onSubmit={handleSubmit}
                        userData={floorData}
                        statusValue={statusValue}
                        setStatusValue={setStatusValue}
                    />
                )}
            </div>
        </>
    );
}

export default Inquiry;
