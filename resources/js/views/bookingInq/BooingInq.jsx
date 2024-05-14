import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/BookingInquiry/actions';
import CreateEditMdl from './CreateEditMdl';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import $ from 'jquery';
import toast from 'react-hot-toast';
import DeleteMdl from '../../components/common/DeleteMdl';
import Spinner from '../../components/Spinner';
function BooingInq() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Inquiry'); // 'add' or 'edit'
    const [booingInqData, setBookingInqData] = useState(null); // Data of user being edited
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [bookingInqListingDatas, setBookinInqListinDatas] = useState([]);

    const {
        loader,
        bookingInqListData,
        bookingInqCreated,
        bookingInqUpdate,
        bookingInqDelete,
        addMutliRooms,
    } = useSelector((state) => state.booingInqReduce);

    const [selectedIds, setSelectedIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const dispatch = useDispatch();
    const columnsConfig = [
        { data: 'id', label: 'Inq No', className: 'table-left' },
        {
            data: null,
            title: `<span class="dt-column-title">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" htmlFor="customCheck1"></label>
                </div>
            </span>`,
            className: 'th-custom action-check dt-orderable-none',
            render: (data, type, row) =>
                `
            <div class="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    class="custom-control-input row-checkbox" 
                    id="customCheckAll" 
                    
                >
                <label class="custom-control-label" htmlFor="customCheckAll"></label>
            </div>
            `,
        },
        {
            data: 'chk_in_dt',
            className: '',
            label: 'ChkIn Date - ChkOut Date',
            render: function (data, type, row) {
                const chkInDate = row.chk_in_dt ?? ''; // Check-in date
                const chkOutDate = row.chk_out_dt ?? ''; // Check-out date
                return chkInDate + ' - ' + chkOutDate; // Combine with a separator
            },
        },
        {
            data: 'cust_name',
            label: 'Customer Details',
            className: '',
            render: function (data, type, row) {
                const custName = row.cust_name ?? ''; // Customer name
                const mobile = row.mobile ?? ''; // Mobile number

                // Return the combined data formatted as HTML paragraphs
                return `<p class="body-2 mb-0">${custName}</p><p class="caption-1 pt-1 mb-0">${mobile}</p>`;
            },
        },
        {
            data: 'room_req',
            label: 'Room Details',
            className: '',
            render: function (data, type, row) {
                let roomDetailsHTML = '';
                if (data && data.length > 0) {
                    roomDetailsHTML = JSON.parse(data)
                        .map((room) => {
                            if (room && room.room_cat_id && room.no_of_rooms) {
                                return `<p class="body-2 mb-0">${room.room_cat_name} <span>x ${room.no_of_rooms}</span></p>`;
                            }
                            return ''; // Return empty string for invalid or missing data
                        })
                        .join('');
                }

                return roomDetailsHTML;
            },
        },
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
    }, [
        dispatch,
        bookingInqCreated,
        bookingInqUpdate,
        bookingInqDelete,
        addMutliRooms,
    ]);

    useEffect(() => {
        setBookinInqListinDatas(bookingInqListData);
    }, [bookingInqListData]);

    function handleAddRoom() {
        setMode('Add Inquiry');
        setBookingInqData(null);
        setOpen(true);
    }
    const handleDelete = (item) => {
        // onDelete(item);
        if (item && item.id) {
            setShowDel(true);
            setDelId(item.id);
        }
    };

    const handleDeleteInquiry = () => {
        if (selectedIds?.length === 0) {
            toast.error('Please Select any one item');
        } else {
            setShowDel(true);
            setDelId(selectedIds);
        }
    };

    const handleEdit = (item) => {
        setMode('Edit Inquiry');
        setBookingInqData(item);
        setOpen(true);
    };

    const handleDelSubmit = () => {
        const bookingid = {
            booking_id: delId,
        };
        dispatch({
            type: actions.BOOKINGINQ_DELETE,
            payload: bookingid,
        });
        setShowDel(false);
    };
    const handleActionSelect = (action) => {
        setSelectedAction(action);
    };
    const handleClearFilters = () => {
        setSelectedAction(''); // Clear selected action to reset filtering
        setSearchQuery('');
    };
    return (
        <div className="container-fluid py-3 px-4">
            {/* <Toaster /> */}
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
                                Inquires List
                            </h5>
                        </div>
                        <div className="col-8 gap-3 action-right">
                            <div className="form-group position-relative search-container">
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
                            <button className="btn btn-secondary d-flex">
                                <span className="material-icons-outlined">
                                    tune
                                </span>
                            </button>

                            {/* <button
                                className="btn btn-outline d-flex"
                                onClick={deleteInquiry}
                            >
                                <span className="material-icons-outlined">
                                    delete
                                </span>
                            </button> */}

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
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={handleDeleteInquiry}
                                        >
                                            Delete
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() =>
                                                handleActionSelect('open')
                                            }
                                        >
                                            Open
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() =>
                                                handleActionSelect('close')
                                            }
                                        >
                                            Close
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                            {/* <button
                                className="btn btn-primary"
                                onClick={handleClearFilters}
                            >
                                <span className="material-icons-outlined">
                                    close
                                </span>
                            </button> */}
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

                {loader ? (
                    <Spinner />
                ) : (
                    <div className="col-12 p-3 container-page">
                        <DataTableComponent
                            data={bookingInqListData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            columnsConfig={columnsConfig}
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedAction={selectedAction}
                            // loader={loader}
                        />
                    </div>
                )}
            </div>
            {open && (
                <CreateEditMdl
                    open={open}
                    setOpen={setOpen}
                    mode={mode}
                    booingInqData={booingInqData}
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
    );
}

export default BooingInq;
