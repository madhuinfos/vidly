import React, { Component } from "react";
import propTypes from "prop-types";

import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, selectedPage } = props;
  let totalPages = Math.ceil(itemsCount / pageSize);

  if (totalPages <= 1) return null;
  const pages = _.range(1, totalPages + 1);

  return (
    <React.Fragment>
      <nav aria-label="Movies navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link">Previous</a>
          </li>

          {pages.map((page) => (
            <li
              key={page}
              className={
                selectedPage === page ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => props.onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  selectedPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
