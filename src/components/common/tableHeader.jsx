import React, { Component } from "react";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn }; // Using the spread operator here to clone the sortColumn object from our state into a new object
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    } else if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    } else {
      return <i className="fa fa-sort-desc"></i>;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              scope="col"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

// the column.path property is used so we can pass a path to the TARGET PROPERTY
