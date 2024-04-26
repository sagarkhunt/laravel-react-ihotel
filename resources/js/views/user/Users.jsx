import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../redux/Users/actions';
import DataTableComponent from '../../components/common/DataTableComponent';
import CreateEditMdl from './CreateEditMdl';
import DeleteMdl from '../../components/common/DeleteMdl';
function Users() {
    const [listingData, setListingData] = useState([]);
    const dispatch = useDispatch();
    const { userListData, userCreateed, userUpdate } = useSelector(
        (state) => state?.usersReducer,
    );
    const [open, setOpen] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [mode, setMode] = useState('Add User'); // 'add' or 'edit'
    const [userData, setUserData] = useState(null); // Data of user being edited
    const [selectedId, setSelectedId] = useState([]);
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left' },
        {
            data: null,
            title: `<span class="dt-column-title">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheckAll">
                    <label class="custom-control-label" htmlFor="customCheckAll"></label>
                </div>
            </span>`,
            className: 'action-check',
            render: () =>
                `
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input row-checkbox">
                    <label class="custom-control-label"></label>
                </div>
                `,
        },
        { data: 'name', label: 'Name' },
        { data: 'email', label: 'Email' },
        {
            data: 'designation_id',
            label: 'Designation',
            className: 'table-left',
        },
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
     * @param{handleAddUser}
     */
    function handleAddUser() {
        setMode('Add User');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditUser} user
     */
    function handleEditUser(user) {
        console.log('🚀 ~ handleEditUser ~ user:', user);
        setMode('Edit User');
        setUserData(user);
        setOpen(true);
    }
    /**
     *
     * @param {handleDeleteUser} rowData
     */
    const handleDeleteUser = (rowData) => {
        // Check if rowData contains the id property
        if (rowData && rowData.id) {
            setShowDel(true);
            setDelId(rowData.id);
        }
    };
    const handleDelSubmit = () => {
        console.log(delId);
    };
    const removeMultiple = () => {
        console.log('=========', selectedId);
    };
    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        // Handle form submission based on mode (add or edit)
        if (mode === 'Add User') {
            dispatch({
                type: actions.USER_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                ...formData,
                user_id: userData.id, // Add user_id to formData
            };
            dispatch({
                type: actions.USER_UPDATE,
                payload: updatedFormData,
            });
        }
        setOpen(false);
    }
    useEffect(() => {
        setListingData(userListData);
    }, [userListData]);
    useEffect(() => {
        dispatch({
            type: actions.USER_LIST,
        });
    }, [userCreateed, userUpdate]);
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

                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    User Management
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12  action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0 ">
                                    User Management
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
                                        id="dt-serach-cstm"
                                        placeholder="Search"
                                    />
                                </div>
                                <button className="btn btn-secondary d-flex">
                                    <span className="material-icons-outlined">
                                        tune
                                    </span>
                                </button>
                                <button className="btn btn-secondary d-flex">
                                    <span className="material-icons-outlined">
                                        add
                                    </span>{' '}
                                    Designation
                                </button>
                                <button
                                    className="btn btn-primary d-flex "
                                    onClick={handleAddUser}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    New User
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

                    <div className="col-12 p-3 container-page">
                        <DataTableComponent
                            data={listingData}
                            onEdit={handleEditUser}
                            onDelete={handleDeleteUser}
                            columnsConfig={columnsConfig}
                            setSelectedId={setSelectedId}
                        />
                        {/* <table className="table custom-table" id="user_table">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="th-custom table-left"
                                    >
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
                                                htmlFor="customCheck1"
                                            ></label>
                                        </div>
                                    </th>
                                    <th scope="col" className="th-custom">
                                        Name
                                    </th>
                                    <th scope="col" className="th-custom">
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="th-custom table-left"
                                    >
                                        Designation
                                    </th>
                                    <th scope="col" className="th-custom">
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
                            <tbody id="user_table_body">
                                {listingData?.length ? (
                                    listingData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="td-custom table-left">
                                                {index + 1}
                                            </td>
                                            <td className="td-custom action-check">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id={`customCheck${index + 1}`}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor={`customCheck${index + 1}`}
                                                    ></label>
                                                </div>
                                            </td>
                                            <td className="td-custom">
                                                {item.name}
                                            </td>
                                            <td className="td-custom">
                                                {item.email}
                                            </td>
                                            <td className="td-custom table-left">
                                                -
                                            </td>
                                            <td className="td-custom">
                                                <div className="status-active status-deactive">
                                                    Active
                                                </div>
                                            </td>
                                            <td>
                                                <span className="material-icons-outlined delete-table">
                                                    cancel_presentation
                                                </span>
                                                <span className="material-icons-outlined edit-table">
                                                    edit
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> */}
                    </div>
                </div>
                {open && (
                    <CreateEditMdl
                        open={open}
                        setOpen={setOpen}
                        mode={mode}
                        onSubmit={handleSubmit}
                        userData={userData}
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

export default Users;
