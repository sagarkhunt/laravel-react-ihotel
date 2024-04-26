// import React, { useEffect, useRef } from 'react';
// import $ from 'jquery'; // Import jQuery
// import DataTable from 'react-data-table-component';

// const DataTableComponent = ({ data }) => {
//     console.log('🚀 ~ DataTableComponent ~ data:', data);
//     const columns = [
//         {
//             id: 1,
//             name: 'Name',
//             selector: (row) => row.name,
//             sortable: true,
//             reorder: true,
//         },
//         {
//             id: 2,
//             name: 'Email',
//             selector: (row) => row.email,
//             sortable: true,
//             reorder: true,
//         },
//         {
//             id: 3,
//             name: 'Designation',
//             selector: (row) => '-',
//             sortable: true,
//             right: true,
//             reorder: true,
//         },
//         {
//             id: 4,
//             name: 'Status',
//             selector: (row) => row.status,
//             sortable: true,
//             right: true,
//             reorder: true,
//         },
//         {
//             id: 'edit',
//             name: 'Action',
//             cell: (row) => (
//                 <>
//                     <span class="material-icons-outlined delete-table">
//                         cancel_presentation
//                     </span>
//                     <span class="material-icons-outlined edit-table">edit</span>
//                 </>
//             ),
//             sortable: false,
//             right: true,
//         },
//     ];

//     return (
//         <DataTable
//             title="User"
//             columns={columns}
//             data={data}
//             defaultSortFieldId={1}
//             // sortIcon={<SortIcon />}
//             pagination
//             selectableRows
//             searching
//         />
//     );
// };

// export default DataTableComponent;

import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';

const DataTableComponent = ({ data, onEdit }) => {
    const tableRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        let dataTableInstance = null;

        if (
            !tableRef.current ||
            !$.fn.DataTable ||
            !Array.isArray(data) ||
            data.length === 0
        )
            return;

        // Ensure that data is an array before proceeding
        const modifiedData = data.map((row) => ({
            ...row,
            action: `
                <label class="custom-control-label" htmlFor="customCheck${row.id}"></label>
                <span class="material-icons-outlined delete-table">
                    cancel_presentation
                </span>
                <span class="material-icons-outlined edit-table">
                    edit
                </span>
            `,
        }));

        // Create DataTable instance
        dataTableInstance = $(tableRef.current).DataTable({
            data: modifiedData,
            paging: true,
            lengthChange: true,
            searching: false,
            ordering: false,
            info: false,
            autoWidth: false,
            responsive: true,
            order: [[0, 'desc']],
            dom: '<"float-left"B><"float-right"f>rt<"row custom-footer-row "<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
            columns: [
                { data: 'id' },
                {
                    data: null,
                    render: function (data, type, row) {
                        // Return the HTML for the checkbox input
                        return `<input type="checkbox" class="custom-control-input" id="customCheck${row.id}">`;
                    },
                },
                { data: 'name' },
                { data: 'email' },
                { data: 'designation_id' },
                { data: 'status' },
                { data: 'action' }, // Include the custom action column with checkbox
            ],
        });
        // Add event listener to handle edit action
        $(tableRef.current).on('click', '.edit-table', function () {
            const rowData = dataTableInstance.row($(this).parents('tr')).data();
            handleEditUser(rowData); // Call function to handle edit action
        });

        return () => {
            // Cleanup function to destroy DataTable instance
            if (dataTableInstance) {
                dataTableInstance.destroy();
            }
        };
    }, [data]);
    const handleEditUser = (user) => {
        setSelectedUser(user);
        onEdit(user);
    };

    return (
        <table ref={tableRef} className="display">
            <thead>
                <tr>
                    <th scope="col" className="th-custom table-left">
                        #
                    </th>
                    <th scope="col" className="th-custom action-check">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheckAll"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="customCheckAll"
                            ></label>
                        </div>
                    </th>
                    <th scope="col" className="th-custom">
                        Name
                    </th>
                    <th scope="col" className="th-custom">
                        Email
                    </th>
                    <th scope="col" className="th-custom table-left">
                        Designation
                    </th>
                    <th scope="col" className="th-custom">
                        Status
                    </th>
                    <th scope="col-auto" className="th-custom action-col">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody />
        </table>
    );
};

export default DataTableComponent;
