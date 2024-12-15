import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName="pagination"
            activeClassName="active"
        />
    );
};

export default Pagination;
