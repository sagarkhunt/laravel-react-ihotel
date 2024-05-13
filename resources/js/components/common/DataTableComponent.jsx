import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import Spinner from '../../components/Spinner';

const DataTableComponent = ({
    data,
    columnsConfig,
    onEdit,
    onDelete,
    selectedIds,
    setSelectedIds,
    searchQuery,
    selectedAction,
    loader,
    onSearchChange,
}) => {
    const tableRef = useRef(null);

    // const filteredData = Array.isArray(data)
    //     ? data.filter((item) => {
    //           return Object.values(item).some(
    //               (value) =>
    //                   String(value)
    //                       .toLowerCase()
    //                       .includes((searchQuery ?? '').toLowerCase()), // Add the nullish coalescing operator here
    //           );
    //       })
    //     : [];
    const filteredData = Array.isArray(data)
        ? data.filter((item) => {
              // Filtering based on search query
              const matchesSearchQuery = Object.values(item).some(
                  (value) =>
                      String(value)
                          .toLowerCase()
                          .includes((searchQuery ?? '').toLowerCase()), // Add the nullish coalescing operator here
              );

              // Filtering based on selected action
              let matchesSelectedAction = true;
              if (selectedAction === 'open') {
                  matchesSelectedAction = item.status === 1; // Filter records with status 1 (open)
              } else if (selectedAction === 'close') {
                  matchesSelectedAction = item.status === 0; // Filter records with status 0 (close)
              }

              // Combine both conditions using logical AND (&&)
              return matchesSearchQuery && matchesSelectedAction;
          })
        : [];

    useEffect(() => {
        let dataTableInstance = null;

        if (
            !tableRef.current ||
            !$.fn.DataTable ||
            !Array.isArray(data) ||
            data.length === 0
        ) {
            // tableRef.current = null;
            return;
        }

        // Create DataTable instance
        dataTableInstance = $(tableRef.current).DataTable({
            data: filteredData,
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

        $(tableRef.current).on('change', '#customCheck1', function (event) {
            const isChecked = event.target.checked;
            const updatedSelectedIds = selectedIds;
            // Set the checked state of each row checkbox based on the state of the "select all" checkbox
            if (event.target.checked) {
                // If "select all" checkbox is checked, add all IDs to selectedIds array
                const allId = data.map((row) => row.id);
                updatedSelectedIds.push(...allId);
                $(tableRef.current)
                    .find('.row-checkbox')
                    .prop('checked', isChecked);
                setSelectedIds(updatedSelectedIds);
            } else {
                $(tableRef.current)
                    .find('.row-checkbox')
                    .prop('checked', isChecked);

                setSelectedIds([]);
            }
        });

        // Set class for each checkbox based on data.id
        $(tableRef.current).on('change', '.row-checkbox', function (event) {
            const rowData = dataTableInstance.row($(this).closest('tr')).data();

            if (rowData && rowData.id) {
                const updatedSelectedIds = selectedIds;

                if (event.target.checked) {
                    // If checkbox is checked, add the ID to selectedIds array
                    updatedSelectedIds.push(rowData.id);
                } else {
                    // If checkbox is unchecked, remove the ID from selectedIds array
                    const index = updatedSelectedIds.indexOf(rowData.id);
                    if (index !== -1) {
                        updatedSelectedIds.splice(index, 1);
                    }
                }
                $(tableRef.current)
                    .find('#customCheck1')
                    .prop('checked', false);

                setSelectedIds(updatedSelectedIds); // Update selectedIds state
            } else {
                console.log('rowData or rowData.id is undefined.');
            }
        });

        return () => {
            // Destroy DataTable instance
            if (dataTableInstance) {
                dataTableInstance.destroy();
            }
        };
    }, [filteredData, columnsConfig, onEdit, onDelete, searchQuery]);

    return (
        <>
            <table ref={tableRef} className="display dataTable">
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
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columnsConfig.length}
                                className="text-center"
                            >
                                <span className="text-muted">
                                    No data found
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default DataTableComponent;
