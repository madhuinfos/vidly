import React from "react";

const Listgroup = (props) => {
  const { items, nameProperty, idProperty, onItemSelect, selectedItem } = props;

  return (
    <React.Fragment>
      <ul className="list-group">
        {items.map((item) => {
          return (
            <li
              onClick={() => onItemSelect(item)}
              key={item[idProperty]}
              className={
                item === selectedItem
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {item[nameProperty]}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

Listgroup.defaultProps = {
  nameProperty: "name",
  idProperty: "_id",
};

export default Listgroup;
