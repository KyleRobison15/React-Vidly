import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export default class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props; // Destructuring the props object
    const pagesCount = Math.ceil(itemsCount / pageSize); // Return the smallest integer >= the result of itemsCount/pageSize
    if (pagesCount === 1) return null; // Dont render the pagination component if there is only 1 page
    const pages = _.range(1, pagesCount + 1); // Uses lodash to create an array of pages from 1 index up to pagesCount (exclusive) + 1

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => {
                  onPageChange(page);
                }}
                className="page-link"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

// Once we have our array of pages from the lodash logic
// We map each page in the array to a jsx expression ( a bootstrap pagination markup )
// Within that bootstrap pagination markup, when a user click's on the anchor tag, we want to raise an event to the movies component to be handled
// So we set the onClick attribute, set it to an arrow function that calls the onPageChange function via props.
// We must pass the onPageChange function the current page (which is why we need to set the onClick attribute to an arrow function so we can pass args)

// Here we use PropTypes to do some type checking on the props that get passed to our components
// Once defined, the prop data type passed to the component must match
// You must import PropTypes from a separate library: npm i prop-types
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
