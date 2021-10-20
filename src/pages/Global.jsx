import React, { useLayoutEffect } from "react";
import Sidebar from "../compoents/Sidebar";
import ReactDOM from "react-dom";
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
