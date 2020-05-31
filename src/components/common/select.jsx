import React from "react";

const Select = ({ name, label, value, items, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        className="form-control"
      >
        <option value=""></option>
        {items.map((x) => (
          <option key={x._id} value={x._id}>
            {x.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
