import React from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    entriesPerPage,
}) => {
    // Generate array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Calculate current items based on pagination
    const indexOfLastItem = currentPage * entriesPerPage;
    const indexOfFirstItem = indexOfLastItem - entriesPerPage;

    return (
        <nav style={{ marginTop: '10px', paddingRight: '5px', float: 'right' }}>
            <ul className="pagination">
                <li
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                </li>
                {pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li
                    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
