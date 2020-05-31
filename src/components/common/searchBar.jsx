import React from "react";

const Searchbar = ({ query, onChange }) => {
  return (
    <input
      type="search"
      className="form-control ds-input m-2"
      placeholder="Search ..."
      value={query}
      onChange={(e) => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default Searchbar;
