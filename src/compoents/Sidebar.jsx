import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PublicIcon from "@material-ui/icons/Public";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { Link, NavLink, useLocation } from "react-router-dom";
function Sidebar() {
  const location = useLocation();
  const [activeHome, setactiveHome] = useState();
  const [activeProfile, setactiveProfile] = useState();
  const { user } = useSelector((state) => state);
  return (
    <div className="sidebar">
      <br />
      <br />
      <NavLink
        to="/main"
        className="sidebar__link"
        activeClassName="link__active"
      >
        <SidebarOption
          active={location.pathname === "/home"}
          Icon={HomeIcon}
          text="Home"
        />{" "}
      </NavLink>
      <NavLink
        to="/global"
        className="sidebar__link"
        activeClassName="link__active"
      >
        <SidebarOption Icon={PublicIcon} text="Global" />
      </NavLink>
      <SidebarOption Icon={AccountBalanceWalletIcon} text="Wallet">
        {" "}
      </SidebarOption>
      <NavLink
        to={`/profile/${user ? user.username : null}`}
        className="sidebar__link"
        activeClassName="link__active"
      >
        <SidebarOption
          active={location.pathname.substr(0, 8) === "/profile"}
          Icon={PermIdentityIcon}
          text="Profile"
        />{" "}
      </NavLink>
      <br />
    </div>
  );
}

export default Sidebar;
