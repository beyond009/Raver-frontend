import React, { Component, useState, useEffect } from "react";
import "./LikeButton.css";
const LikeButton = (props) => {
  const animation_class = props.liked ? "liked" : props.fave ? "fave-ani" : "";
  return (
    <div>
      <div className="fave-container" onClick={props.handleClickLike}>
        <div className={`twitter-fave ${animation_class}`}></div>
      </div>
    </div>
  );
};

export default LikeButton;
