import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/Rooms/actions';
import { Link } from 'react-router-dom';
import CreateEditMdl from './CreateEditMdl';
import MultiRoomMdl from './MultiRoomMdl';
import DataTableComponent from '../../components/common/DataTableComponent';
import DeleteMdl from '../../components/common/DeleteMdl';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
function Rooms() {
    const [open, setOpen] = useState(false);
    const [openMultiRoom, setOpenMultiRoom] = useState(false);
    const [mode, setMode] = useState('Add Room'); // 'add' or 'edit'
    const [modeMultiRoom, setModeMultiRoom] = useState('Add Multiple Rooms'); // 'add' or 'edit'
    const [roomsData, setRoomsData] = useState(null); // Data of user being edited
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [roomListingData, setRoomListinData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const {
        loader,
        roomsListData,
        roomsCreated,
        roomsUpdate,
        roomsDelete,
        addMutliRooms,
    } = useSelector((state) => state.roomReducer);
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
                    <input type="checkbox" class="custom-control-input row-checkbox" id="customCheckAll">
                    <label class="custom-control-label" htmlFor="customCheckAll"></label>
                </div>
                `,
        },
        { data: 'room_no', label: 'Room Names/Numbers' },
        {
            data: 'room_cate',
            label: 'Room Category',
            render: function (data, type, row) {
                return data?.cat_name ?? '';
            },
        },
        {
            data: 'room_section',
            label: 'Section',
            render: function (data, type, row) {
                return data?.name ?? '';
            },
        },
        {
            data: 'room_floor',
            label: 'Floor',
            render: function (data, type, row) {
                return data?.name ?? '';
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
            type: actions.ROOMS_LIST,
        });
    }, [dispatch, roomsCreated, roomsUpdate, roomsDelete, addMutliRooms]);

    useEffect(() => {
        setRoomListinData(roomsListData);
    }, [roomsListData]);

    function handleAddRoom() {
        setMode('Add Room');
        setOpen(true);
    }
    function handleAddMultiRoom() {
        setModeMultiRoom();
        setOpenMultiRoom(true);
    }

    const handleEdit = (item) => {
        // onEdit(item);
        setMode('Edit Room');
        setRoomsData(item);
        setOpen(true);
    };
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
            toast.error('Please select any one Room');
        } else {
            setShowDel(true);
            setDelId(selectedIds);
        }
    };
    const handleDelSubmit = () => {
        const roomId = {
            room_id: delId,
        };
        dispatch({
            type: actions.ROOMS_DELETE, // Replace with your actual action type
            payload: roomId,
        });
        setShowDel(false);
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
                            <li className="breadcrumb-item">
                                <a href="#">Room Management</a>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Room
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12  action-header">
                    <div className="row">
                        <div className="col-4 d-flex align-items-center">
                            <h5 className="headline-h6m mb-0 ">
                                Room Categories List
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
                                onClick={handleAddRoom}
                            >
                                <span className="material-icons-outlined">
                                    add
                                </span>
                                Add Room
                            </button>
                            <button
                                className="btn btn-secondary d-flex"
                                onClick={handleAddMultiRoom}
                            >
                                <span className="material-icons-outlined">
                                    add
                                </span>
                                Add Multiple Rooms{' '}
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
                            // loader={loader}
                            data={roomListingData}
                            onEdit={handleEdit}
                            columnsConfig={columnsConfig}
                            onDelete={handleDelete}
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                        {/* <table className="table custom-table" id="room_cate_table">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="th-custom border-bnone"
                                    style={{ border: 'none !important' }}
                                    width=""
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom border-bnone action-check"
                                    style={{ border: 'none !important' }}
                                >
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck1"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheck1"
                                        ></label>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom border-bnone"
                                    style={{ border: 'none !important' }}
                                >
                                    Room Category
                                </th>
                                <th
                                    scope="col"
                                    colSpan="4"
                                    className="th-custom text-center"
                                    width="30%"
                                >
                                    Occupancy (Persons)
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom border-bnone text-center"
                                    style={{ border: 'none !important' }}
                                    width=""
                                >
                                    Extra Bed(s) Allowed
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom border-bnone"
                                    style={{ border: 'none !important' }}
                                    width=""
                                >
                                    Rooms
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom border-bnone"
                                    style={{ border: 'none !important' }}
                                    width=""
                                >
                                    Status
                                </th>
                                <th
                                    scope="col-auto"
                                    className="th-custom action-col border-bnone"
                                    style={{ border: 'none !important' }}
                                >
                                    Action
                                </th>
                            </tr>
                            <tr>
                                <th scope="col" className="th-custom"></th>
                                <th scope="col" className="th-custom"></th>
                                <th scope="col" className="th-custom"></th>
                                <th
                                    scope="col"
                                    className="th-custom action-check"
                                >
                                    Base
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom action-check"
                                >
                                    Maximum
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom action-check"
                                >
                                    Adult
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom action-check"
                                >
                                    Child
                                </th>
                                <th scope="col" className="th-custom"></th>
                                <th scope="col" className="th-custom"></th>
                                <th scope="col" className="th-custom"></th>
                                <th
                                    scope="col-auto"
                                    className="th-custom action-col"
                                ></th>
                            </tr>
                        </thead>
                        <tbody id="room_cate_table_body">
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="td-custom table-left">
                                            {item.id}
                                        </td>
                                        <td className="td-custom action-check">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={`customCheck${item.id}`}
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor={`customCheck${item.id}`}
                                                ></label>
                                            </div>
                                        </td>
                                        <td className="td-custom">
                                            {item.cat_name}
                                        </td>
                                        <td className="td-custom">
                                            {item.base_occu}
                                        </td>
                                        <td className="td-custom">
                                            {item.max_occu}
                                        </td>
                                        <td className="td-custom">
                                            {item.max_adult}
                                        </td>
                                        <td className="td-custom">
                                            {item.max_child}
                                        </td>
                                        <td className="td-custom">
                                            {item.max_extra_bed}
                                        </td>

                                        <td className="td-custom">
                                            <a className="a-btn-link">
                                                10 Rooms / Add Rooms
                                            </a>
                                        </td>
                                        <td className="td-custom">
                                            <div
                                                className={
                                                    item.status == 1
                                                        ? 'status-active'
                                                        : 'status-deactive'
                                                }
                                            >
                                                {item.status == 1
                                                    ? 'Active'
                                                    : 'Deactive'}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className="material-icons-outlined delete-table"
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            >
                                                cancel_presentation
                                            </span>
                                            <span
                                                className="material-icons-outlined edit-table"
                                                onClick={() => handleEdit(item)}
                                            >
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table> */}
                        {/* Add pagination component */}
                        {/* <div className="row mt-10 right">
                        <div className="col-12">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(
                                    cateListingData.length / itemsPerPage,
                                )}
                                onPageChange={onPageChange}
                                entriesPerPage={entriesPerPage}
                            />
                        </div>
                    </div> */}
                    </div>
                )}
            </div>
            {open && (
                <CreateEditMdl
                    open={open}
                    setOpen={setOpen}
                    mode={mode}
                    // onSubmit={handleSubmit}
                    roomsData={roomsData}
                />
            )}

            {openMultiRoom && (
                <MultiRoomMdl
                    open={openMultiRoom}
                    setOpen={setOpenMultiRoom}
                    // onSubmit={handleSubmit}
                    // cateData={cateData}
                    // statusValue={statusValue}
                    // setStatusValue={setStatusValue}
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

export default Rooms;
