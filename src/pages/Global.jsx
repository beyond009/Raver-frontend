import React, { Component } from "react";
import GlobalPosts from "../compoents/GlobalPosts";
import "./Global.css";
const Global = () => {
  return (
    <div className="global">
      <div className="global__header">
        <h2>Global</h2>
      </div>
      <GlobalPosts />
    </div>
  );
};
export default Global;
