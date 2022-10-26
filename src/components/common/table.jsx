import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
  render() {
    const { columns, sortColumn, onSort, data } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody columns={columns} data={data}></TableBody>
      </table>
    );
  }
}

export default Table;
