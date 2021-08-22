import React from "react";
import "./Widgets.css";
import UserList from "../utils/UserList";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Post" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>Recommend</h2>
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
      </div>
    </div>
  );
}

export default Widgets;
