import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

const PaginationComponet = ({
  itemsPerPage, totalItems, paginate, activePage
}) => (
  <Pagination
    activePage={activePage}
    itemsCountPerPage={itemsPerPage}
    totalItemsCount={totalItems}
    pageRangeDisplayed={5}
    itemClass="page-item"
    linkClass="page-link"
    onChange={(page) => paginate(page)}
  />
);

PaginationComponet.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
};
export default PaginationComponet;
