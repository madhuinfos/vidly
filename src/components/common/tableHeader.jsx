import React, { Component } from "react";

class TableHeader extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <thead>
          <tr>
            {this.props.items.map((column) => (
              <th
                key={column.name || column.key}
                onClick={() => this.onSort(column.name)}
              >
                {column.displayName} {this.renderSortIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
      </React.Fragment>
    );
  }

  onSort(path) {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  }

  renderSortIcon(column) {
    const sortColumn = { ...this.props.sortColumn };
    console.log(sortColumn.path);
    if (sortColumn.path !== column.name) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  }
}

export default TableHeader;
