import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import CreateEditMdl from './CreateEditMdl';
import actions from '../../redux/Inquiry/actions';
import toast from 'react-hot-toast';
import DeleteMdl from '../../components/common/DeleteMdl';
import Spinner from '../../components/Spinner';

function Inquiry() {
    const [listingData, setListingData] = useState([]);
    const dispatch = useDispatch();
    const {
        loader,
        inquiryListData,
        inquiryCreated,
        inquiryUpdate,
        inquiryDelete,
    } = useSelector((state) => state?.inquiryReducer);
    const [statusValue, setStatusValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Inquiry Type'); // 'add' or 'edit'
    const [floorData, setFloorData] = useState(null); // Data of user being edited
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '5%' },
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
                    <input type="checkbox" class="custom-control-input row-checkbox" id="customCheckAll">
                    <label class="custom-control-label" htmlFor="customCheckAll"></label>
                </div>
                `,
            width: '5%',
            className: 'table-right',
        },
        { data: 'inq_type', label: 'Inquiry Type', width: '25%' },
        { data: 'inq_desc', label: 'Description', width: '50%' },
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
            width: '7.5%',
        },
        {
            data: null,
            label: 'Action',
            render: () =>
                `
                <span class="material-icons-outlined edit-table">
                    edit
                </span>
                <span class="material-icons-outlined delete-table">
                    cancel_presentation
                </span>
            `,
            className: 'action-container',
            width: '7.5%',
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
    }, [inquiryCreated, inquiryUpdate, inquiryDelete]);
    /**
     *
     * @param {handleDelete} item
     */
    const handleDelete = (item) => {
        // onDelete(item);
        if (item && item.id) {
            setShowDel(true);
            setDelId(item.id);
        }
    };
    /**
     * Remove multiple
     */
    const removeMultiple = () => {
        if (selectedIds?.length === 0) {
            toast.error('Please select any one Room View');
        } else {
            setShowDel(true);
            setDelId(selectedIds);
        }
    };
    const handleDelSubmit = () => {
        const inquiryId = {
            inq_id: delId,
        };
        dispatch({
            type: actions.INQUIRY_DELETE, // Replace with your actual action type
            payload: inquiryId,
        });
        setShowDel(false);
    };
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
                                <div className="form-group  position-relative search-container">
                                    <span className="material-icons-outlined search-icon">
                                        search
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control search-input"
                                        id="customInput"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                    {searchQuery && (
                                        <span
                                            className="material-icons-outlined close-icon"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                                <button
                                    className="btn btn-primary d-flex "
                                    onClick={handleAddFloor}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    New Inquiry Types
                                </button>

                                <button
                                    className="btn btn-outline d-flex"
                                    onClick={removeMultiple}
                                >
                                    <span className="material-icons-outlined">
                                        delete
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {loader ? (
                        <Spinner />
                    ) : (
                        <div className="col-12 p-3 container-page">
                            <DataTableComponent
                                data={listingData}
                                onEdit={handleEditFloor}
                                columnsConfig={columnsConfig}
                                onDelete={handleDelete}
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                            />
                        </div>
                    )}
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
                {showDel && (
                    <DeleteMdl
                        open={showDel}
                        setOpen={setShowDel}
                        onSubmit={handleDelSubmit}
                        delId={setDelId}
                    />
                )}
            </div>
        </>
    );
}

export default Inquiry;
