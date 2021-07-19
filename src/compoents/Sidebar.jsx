import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { Link, NavLink } from "react-router-dom";
function Sidebar() {
  const [activeHome, setactiveHome] = useState();
  const [activeProfile, setactiveProfile] = useState();
  return (
    <div className="sidebar">
      <NavLink
        to="/home"
        className="sidebar__link"
        activeClassName="link__active"
      >
        <SidebarOption active={activeHome} Icon={HomeIcon} text="Home" />{" "}
      </NavLink>
      {/* <SidebarOption Icon={SearchIcon} text="Explore" /> */}
      {/* <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists" /> */}
      <SidebarOption Icon={AccountBalanceWalletIcon} text="Wallet">
        {" "}
      </SidebarOption>
      <NavLink
        to="/profile"
        className="sidebar__link"
        activeClassName="link__active"
      >
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />{" "}
      </NavLink>

      <SidebarOption Icon={MoreHorizIcon} text="More" />
    </div>
  );
}

export default Sidebar;
