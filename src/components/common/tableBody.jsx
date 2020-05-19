import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {};
  renderCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.name);
  }

  render() {
    return (
      <tbody>
        {this.props.items.map((item) => (
          <tr key={item._id}>
            {this.props.columns.map((column) => (
              <td key={item._id + (column.name || column.key)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
