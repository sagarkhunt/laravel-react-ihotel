import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import CreateEditMdl from './CreateEditMdl';
import actions from '../../redux/RoomView/actions';

function RoomView() {
    const [listingData, setListingData] = useState([]);
    const dispatch = useDispatch();
    const { roomViewListData, roomViewCreated, roomViewUpdate } = useSelector(
        (state) => state.roomViewReduce,
    );
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Room View'); // 'add' or 'edit'
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
        { data: 'room_view', label: 'Room View' },
        { data: 'desc', label: 'Description' },
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
        setMode('Add Room View');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditFloor} user
     */
    function handleEditFloor(user) {
        setMode('Edit Room View');
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
        if (mode === 'Add Room View') {
            dispatch({
                type: actions.ROOMVIEW_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                room_view: formData.room_view,
                desc: formData.desc,
                room_view_id: formData.id, // Add user_id to formData
                status: 'true',
            };

            dispatch({
                type: actions.ROOMVIEW_UPDATE,
                payload: updatedFormData,
            });
        }
        setOpen(false);
    }
    useEffect(() => {
        setListingData(roomViewListData);
    }, [roomViewListData]);
    useEffect(() => {
        dispatch({
            type: actions.ROOMVIEW_LIST,
        });
    }, [roomViewCreated, roomViewUpdate]);
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
                                    <a href="#">Room Management</a>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Room View
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12  action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0 ">
                                    Room View List
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
                                    New Plan
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
                    />
                )}
            </div>
        </>
    );
}

export default RoomView;
