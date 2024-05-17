import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import CreateEditMdl from './CreateEditMdl';
import actions from '../../redux/Amenity/actions';
import DeleteMdl from '../../components/common/DeleteMdl';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';

function Amenity() {
    const [listingData, setListingData] = useState([]);

    const dispatch = useDispatch();
    const {
        loader,
        amenityListData,
        amenityCreated,
        amenityUpdate,
        amenityDelete,
    } = useSelector((state) => state?.amenityReducer);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Amenity'); // 'add' or 'edit'
    const [amenityData, setAmenityData] = useState(null); // Data of user being edited
    const [statusValue, setStatusValue] = useState(0);
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
        { data: 'amnt', label: 'Amenities', width: '32.5%' },
        { data: 'description', label: 'Description', width: '42.5%' },
        // { data: 'created_by', label: 'Rooms' },
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
        setMode('Add Amenity');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditFloor} user
     */
    function handleEditFloor(user) {
        setMode('Edit Amenity');
        setAmenityData(user);
        setOpen(true);
    }
    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        // Handle form submission based on mode (add or edit)
        if (mode === 'Add Amenity') {
            dispatch({
                type: actions.AMENITY_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                amnt: formData.amnt,
                amnt_icon: formData.amnt_icon,
                description: formData.description,
                amnt_id: formData.id, // Add user_id to formData
                status: statusValue,
            };
            dispatch({
                type: actions.AMENITY_UPDATE,
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
            toast.error('Please select any one amenity');
        } else {
            setShowDel(true);
            setDelId(selectedIds);
        }
    };
    const handleDelSubmit = () => {
        const amenityId = {
            amenity_id: delId,
        };
        dispatch({
            type: actions.AMENITY_DELETE, // Replace with your actual action type
            payload: amenityId,
        });
        setShowDel(false);
    };
    useEffect(() => {
        setListingData(amenityListData);
    }, [amenityListData]);
    useEffect(() => {
        dispatch({
            type: actions.AMENITY_LIST,
        });
    }, [amenityCreated, amenityUpdate, amenityDelete]);
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
                                    <a href="#">Amenity Management</a>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Amenity
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12  action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0 ">
                                    Amenity List
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
                                    onClick={handleAddFloor}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    New Amenity
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
                                // loader={loader}
                            />
                            {/* <table className="table custom-table" id="floor_table">
                            <thead>
                                <tr>
                                    <th scope="col" className="th-custom">
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        className="th-custom action-check"
                                    >
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customCheck1"
                                            />
                                            <label
                                                className="custom-control-label"
                                                for="customCheck1"
                                            ></label>
                                        </div>
                                    </th>
                                    <th scope="col" className="th-custom">
                                        Floors Name
                                    </th>
                                    <th scope="col" className="th-custom">
                                        Rooms
                                    </th>

                                    <th
                                        scope="col"
                                        className="th-custom"
                                        width="10%"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col-auto"
                                        className="th-custom action-col"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="floor_table_body"></tbody>
                        </table> */}
                        </div>
                    )}
                </div>
                {open && (
                    <CreateEditMdl
                        open={open}
                        setOpen={setOpen}
                        mode={mode}
                        onSubmit={handleSubmit}
                        userData={amenityData}
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

export default Amenity;
