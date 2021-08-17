import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    "margin-top": "50px",
    "margin-left": "240px",
    "margin-right": "290px",
    "margin-bottom": "50px",
  },
}));
const LinkAvatar = (props) => {
  const location = useLocation();
  return (
    <div>
      <NavLink to={`/profile/${props.username}`}>
        <Avatar src={props.avatar} />
      </NavLink>
    </div>
  );
};
export default LinkAvatar;
