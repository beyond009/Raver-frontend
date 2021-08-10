import React, { Component, useState, useEffect } from "react";

import Fave from "../../assets/fave";
import "./LikeButton.css";
const LikeButton = () => {
  const [fave, setFave] = useState(false);
  const handleClick = () => {
    if (fave) {
      setFave(false);
    } else {
      setFave(true);
    }
  };

  const animation_class = fave ? "fave-ani" : "";
  return (
    <div>
      <div className="fave-container" onClick={handleClick}>
        <div className={`twitter-fave ${animation_class}`}></div>
      </div>
    </div>
  );
};

export default LikeButton;
