import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/RoomCategory/actions';
import { Link } from 'react-router-dom';
import CreateEditMdl from './CreateEditMdl';
import Pagination from '../../components/common/Pagination';
import DeleteMdl from '../../components/common/DeleteMdl';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
function RoomCategory() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Room Category'); // 'add' or 'edit'
    const [cateData, setCateData] = useState(null); // Data of user being edited
    const [cateListingData, setCatListingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page
    const itemsPerPage = 10; // Number of items per page
    const [statusValue, setStatusValue] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [delId, setDelId] = useState('');
    const {
        loader,
        roomCateListData,
        roomCateCreated,
        roomCateUpdate,
        roomCateDelete,
    } = useSelector((state) => state.roomCateReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setCatListingData(roomCateListData);
    }, [roomCateListData]);

    // Calculate current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = cateListingData.slice(
    //     indexOfFirstItem,
    //     indexOfLastItem,
    // );
    let currentItems = [];
    if (cateListingData !== null && cateListingData !== undefined) {
        if (Array.isArray(cateListingData)) {
            const filteredData = cateListingData.filter((item) =>
                item.cat_name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            currentItems = filteredData.slice(
                indexOfFirstItem,
                indexOfLastItem,
            );
        }
    }

    // console.log(currentItems)

    // Change page
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function handleAddCate() {
        setMode('Add Room Category');
        setOpen(true);
    }

    const handleEdit = (item) => {
        // onEdit(item);
        setMode('Edit Room Category');
        setCateData(item);
        setOpen(true);
    };
    useEffect(() => {
        dispatch({
            type: actions.ROOMCATEGORY_LIST,
        });
    }, [dispatch, roomCateCreated, roomCateUpdate, roomCateDelete]);

    const handleHeaderCheckboxChange = () => {
        setIsChecked((prevChecked) => !prevChecked); // Toggle checkbox state

        if (!isChecked) {
            // If checkbox is checked, select all data list items
            const ids = cateListingData.map((item) => item.id);
            setSelectedIds(ids);
        } else {
            // If checkbox is unchecked, clear the array
            setSelectedIds([]);
        }
    };

    const handleRowCheckboxChange = (id) => {
        const index = selectedIds.indexOf(id);
        if (index === -1) {
            // If ID not found, add it to the array
            setSelectedIds((prevIds) => [...prevIds, id]);
        } else {
            // If ID found, remove it from the array
            setSelectedIds((prevIds) => prevIds.filter((item) => item !== id));
        }
    };
    /**
     * delete multiple cate item
     */
    const deleteMultiCate = () => {
        if (selectedIds?.length === 0) {
            toast.error('Please select room categroy');
        } else {
            setShowDel(true);
            setDelId(selectedIds);
        }
    };
    /**
     *
     * @param {handleDelete single} item
     */
    const handleDelete = (item) => {
        if (item && item.id) {
            setShowDel(true);
            setDelId(item.id);
        }
    };
    const handleDelSubmit = () => {
        const roomCateId = {
            cate_id: delId,
        };

        dispatch({
            type: actions.ROOMCATEGORY_DELETE, // Replace with your actual action type
            payload: roomCateId,
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
                                Room Category
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
                                onClick={handleAddCate}
                            >
                                <span className="material-icons-outlined">
                                    add
                                </span>
                                New Category
                            </button>
                            <button
                                className="btn btn-outline d-flex"
                                onClick={deleteMultiCate}
                            >
                                <span className="material-icons-outlined">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 p-3 container-page">
                    <table className="table custom-table" id="room_cate_table">
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
                                            checked={isChecked}
                                            onChange={
                                                handleHeaderCheckboxChange
                                            }
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
                                    width="7.5%"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col-auto"
                                    className="th-custom action-col border-bnone action-container"
                                    width="7.5%"
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
                            {loader ? (
                                <tr>
                                    <td colSpan="11">
                                        <Spinner />
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="td-custom table-left">
                                                    {item.id}
                                                </td>
                                                <td className="td-custom action-check">
                                                    <div className="custom-control custom-checkbox">
                                                        {/* <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={`customCheck${item.id}`}
                                                /> */}
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id={`customCheck${item.id}`}
                                                            checked={selectedIds.includes(
                                                                item.id,
                                                            )}
                                                            onChange={() =>
                                                                handleRowCheckboxChange(
                                                                    item.id,
                                                                )
                                                            }
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
                                                <td className="td-custom text-center">
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
                                                <td
                                                    className="table-right"
                                                    style={{
                                                        paddingRight: '25px',
                                                    }}
                                                >
                                                    <span
                                                        className="material-icons-outlined edit-table"
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                    >
                                                        edit
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined delete-table"
                                                        onClick={() =>
                                                            handleDelete(item)
                                                        }
                                                    >
                                                        cancel_presentation
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="11">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                    {/* Add pagination component */}
                    <div className="row mt-10 right">
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
                    </div>
                </div>
            </div>
            {open && (
                <CreateEditMdl
                    open={open}
                    setOpen={setOpen}
                    mode={mode}
                    // onSubmit={handleSubmit}
                    cateData={cateData}
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
    );
}

export default RoomCategory;
