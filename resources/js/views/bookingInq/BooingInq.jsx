import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/BookingInquiry/actions';
import CreateEditMdl from './CreateEditMdl';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
function BooingInq() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Inquiry'); // 'add' or 'edit'
    const [booingInqData, setBookingInqData] = useState(null); // Data of user being edited

    const [bookingInqListingData, setBookinInqListinData] = useState([]);
    const {
        bookingInqListData,
        bookingInqCreated,
        bookingInqUpdate,
        addMutliRooms,
    } = useSelector((state) => state.booingInqReduce);
    const dispatch = useDispatch();
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left' },
        {
            data: null,
            title: `<span class="dt-column-title">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" htmlFor="customCheck1"></label>
                </div>
            </span>`,
            className: 'action-check',
            render: () =>
                `
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheckAll">
                    <label class="custom-control-label" htmlFor="customCheckAll"></label>
                </div>
                `,
        },
        {
            data: 'chk_in_dt',
            label: 'From Date - To Date',
            render: function (data, type, row) {
                const chkInDate = row.chk_in_dt ?? ''; // Check-in date
                const chkOutDate = row.chk_out_dt ?? ''; // Check-out date
                return chkInDate + ' - ' + chkOutDate; // Combine with a separator
            },
        },
        {
            data: 'cust_name',
            label: 'Customer Details',
            render: function (data, type, row) {
                const custName = row.cust_name ?? ''; // Customer name
                const mobile = row.mobile ?? ''; // Mobile number

                // Return the combined data formatted as HTML paragraphs
                return `<p className="body-2 mb-0">${custName}</p><p className="caption-1 pt-1 mb-0">${mobile}</p>`;
            },
        },
        {
            // data: 'room_section',ssssss
            label: 'Room Category x Rooms',
            render: function (data, type, row) {
                return `<p className="body-2 mb-0">Deluxe Room <span>x1</span></p><p className="body-2 mb-0">Deluxe Room <span>x1</span></p>`;
            },
        },
        {
            data: 'status',
            label: 'Status',
            render: function (data, type, row) {
                if (data == 1) {
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

    useEffect(() => {
        dispatch({
            type: actions.BOOKINGINQ_LIST,
        });
    }, [dispatch, bookingInqCreated, bookingInqUpdate, addMutliRooms]);

    useEffect(() => {
        setBookinInqListinData(bookingInqListData);
    }, [bookingInqListData]);

    function handleAddRoom() {
        setMode('Add Inquiry');
        setOpen(true);
    }
    const handleDelete = (item) => {
        onDelete(item);
    };

    const handleEdit = (item) => {
        // onEdit(item);
        setMode('Edit Inquiry');
        setBookingInqData(item);
        setOpen(true);
    };
    return (
        <div className="container-fluid py-3 px-4">
            <div className="row m-0">
                <div className="col-12 p-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-2">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Inquiry
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12  action-header">
                    <div className="row">
                        <div className="col-4 d-flex align-items-center">
                            <h5 className="headline-h6m mb-0 ">
                                Inquires List List
                            </h5>
                        </div>
                        <div className="col-8 gap-3 action-right">
                            <div className="form-group  position-relative">
                                <span className="material-icons-outlined search-icon">
                                    search
                                </span>
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    id="customInput"
                                    placeholder="Search"
                                />
                            </div>
                            <button className="btn btn-secondary d-flex">
                                <span className="material-icons-outlined">
                                    tune
                                </span>
                            </button>

                            <button className="btn btn-outline d-flex">
                                <span className="material-icons-outlined">
                                    delete
                                </span>
                            </button>

                            <div className="dropdown">
                                <button
                                    className="btn  btn-outline  dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Actions
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Open
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Close
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <button
                                className="btn btn-primary d-flex "
                                onClick={handleAddRoom}
                            >
                                <span className="material-icons-outlined">
                                    add
                                </span>
                                Add Inquiry
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 p-3 container-page">
                    <DataTableComponent
                        data={bookingInqListingData}
                        onEdit={handleEdit}
                        columnsConfig={columnsConfig}
                    />
                </div>
            </div>
            {open && (
                <CreateEditMdl
                    open={open}
                    setOpen={setOpen}
                    mode={mode}
                    booingInqData={booingInqData}
                />
            )}
        </div>
    );
}

export default BooingInq;