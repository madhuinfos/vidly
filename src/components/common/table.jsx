import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, items, sortColumn, onSort }) => {
  return (
    <table className="table">
      <TableHeader
        items={columns}
        sortColumn={sortColumn}
        onSort={(sortColumn) => onSort(sortColumn)}
      ></TableHeader>

      <TableBody items={items} columns={columns}></TableBody>
    </table>
  );
};

export default Table;
