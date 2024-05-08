import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';

const DataTableComponent = ({
    data,
    columnsConfig,
    onEdit,
    onDelete,
    setSelectedId,
}) => {
    const tableRef = useRef(null);

    useEffect(() => {
        let dataTableInstance = null;

        if (
            !tableRef.current ||
            !$.fn.DataTable ||
            !Array.isArray(data) ||
            data.length === 0
        )
            return;

        // Create DataTable instance
        dataTableInstance = $(tableRef.current).DataTable({
            data,
            paging: true,
            lengthChange: true,
            searching: false,
            ordering: false,
            info: false,
            autoWidth: false,
            responsive: true,
            language: {
                search: 'search',
            },
            pagingType: 'simple_numbers',
            dom: '<"float-left"B><"float-right"f>rt<"row custom-footer-row "<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
            order: [[0, 'desc']],
            columns: columnsConfig,
        });

        // Add event listener to handle edit action
        $(tableRef.current).on('click', '.edit-table', function () {
            const rowData = dataTableInstance.row($(this).parents('tr')).data();
            onEdit(rowData); // Call the provided edit action callback
        });

        // Add event listener to handle delete action
        $(tableRef.current).on('click', '.delete-table', function () {
            const rowData = dataTableInstance.row($(this).parents('tr')).data();
            onDelete(rowData); // Call the provided delete action callback
        });

        $(tableRef.current).on('click', '.row-checkbox', function () {
            // Get the index of the row
            const rowIndex = dataTableInstance
                .row($(this).closest('tr'))
                .index();

            // Retrieve the data for the row index
            const rowData = dataTableInstance.row(rowIndex).data();

            if (rowData && rowData.id) {
                const selectedId = rowData.id; // Get the ID of the clicked row

                const isChecked = $(this).prop('checked'); // Check if the checkbox is checked

                if (isChecked) {
                    // If the checkbox is checked, push the ID to the array
                    setSelectedId((prevSelectedId) => [
                        ...prevSelectedId,
                        selectedId,
                    ]);
                } else {
                    // If the checkbox is unchecked, remove the ID from the array
                    setSelectedId((prevSelectedId) =>
                        prevSelectedId.filter((id) => id !== selectedId),
                    );
                }
            }
        });

        return () => {
            // Cleanup function to destroy DataTable instance
            if (dataTableInstance) {
                dataTableInstance.destroy();
            }
        };
    }, [data, columnsConfig, onEdit, setSelectedId]);

    return (
        <table ref={tableRef} className="display">
            <thead>
                <tr>
                    {columnsConfig.map((column, index) => (
                        <th
                            key={index}
                            scope="col"
                            className={`th-custom ${column.className}`}
                        >
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody />
        </table>
    );
};

export default DataTableComponent;
