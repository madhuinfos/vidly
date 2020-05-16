import React from "react";

const Like = (props) => {
  let likeClass = "fa fa-heart";

  if (!props.liked) likeClass += "-o";

  return (
    <i
      className={likeClass}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
