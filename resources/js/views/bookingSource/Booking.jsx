import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import CreateEditMdl from './CreateEditMdl';
import DeleteMdl from '../../components/common/DeleteMdl';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/BookingSource/actions';

function Booking() {
    const [listingData, setListingData] = useState([]);

    const dispatch = useDispatch();
    const {
        loader,
        bookingListData,
        bookingCreated,
        bookingUpdate,
        bookingDelete,
    } = useSelector((state) => state?.bookingReducer);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Booikng Source'); // 'add' or 'edit'
    const [businessData, setBusinessData] = useState(null); // Data of user being edited
    const [statusValue, setStatusValue] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        { data: 'name', label: 'Business Source Name', width: '70%' },
        {
            data: 'status',
            label: 'Status',
            render: function (data, type, row) {
                if (data == 1) {
                    return `<div class=""><span class="material-icons-outlined check-table">
                    check_circle
                </span></div>`;
                } else {
                    return `<div class=""><span class="material-icons-outlined cancel-table">
                    cancel
                </span></div>`;
                }
            },
            className: 'table-right',
            width: '10%',
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
            width: '10%',
        },
    ];

    /***
     * @param {handleAddBusinessResource}
     */
    function handleAddBusinessResource() {
        setMode('Add Booking Source');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditBusinessResource} user
     */
    function handleEditBusinessResource(user) {
        setMode('Edit Booking Source');
        setBusinessData(user);
        setOpen(true);
    }

    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        if (mode === 'Add Booking Source') {
            dispatch({
                type: actions.BOOKING_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                name: formData.name,
                booking_sou_id: formData.id,
                status: statusValue,
            };
            dispatch({
                type: actions.BOOKING_UPDATE,
                payload: updatedFormData,
            });
        }
        setOpen(false);
    }
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
            toast.error('Please select any one business');
        } else {
            setShowDel(true);
            setDelId(selectedIds);
        }
    };
    const handleDelSubmit = () => {
        const businessId = {
            booking_sou_id: delId,
        };
        dispatch({
            type: actions.BOOKING_DELETE,
            payload: businessId,
        });
        setShowDel(false);
    };
    useEffect(() => {
        setListingData(bookingListData);
    }, [bookingListData]);
    useEffect(() => {
        dispatch({
            type: actions.BOOKING_LIST,
        });
    }, [bookingCreated, bookingUpdate, bookingDelete]);

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
                                    <a href="#">Master</a>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Booking Source Master
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12  action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0 ">
                                    Booking Source List
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
                                        id="dt-serach-cstm"
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
                                    onClick={handleAddBusinessResource}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    New Booking Source
                                </button>

                                {/* <button
                                    className="btn btn-outline d-flex"
                                    onClick={removeMultiple}
                                >
                                    <span className="material-icons-outlined">
                                        delete
                                    </span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    {loader ? (
                        <Spinner />
                    ) : (
                        <div className="col-12 p-3 container-page">
                            <DataTableComponent
                                data={listingData}
                                onEdit={handleEditBusinessResource}
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
                        userData={businessData}
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

export default Booking;
