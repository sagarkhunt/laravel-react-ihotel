import React from 'react';
import { Link } from 'react-router-dom';
import actions from '../../redux/Amenity/actions';
import DeleteMdl from '../../components/common/DeleteMdl';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';

function AddReservation() {
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

export default AddReservation;
