import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Feed from "../compoents/Feed";
import MailIcon from "@material-ui/icons/Mail";
import banner from "../../assets/1500x500.jpeg";
import history from "../History";
import "./Profile.css";

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
  },
}));

export default function Profile() {
  const { user, authActor, identity } = useSelector((state) => state);
  const classes = useStyles();

  function handleClickEdit() {
    history.push({ pathname: "/editprofile" });
  }
  return (
    <div className="profile">
      <div className="profile__header">
        <h2>Profile</h2>
      </div>
      <img src={banner} className="profile__banner" />
      <div className="profile__avatar">
        <Avatar className={classes.large} src={user ? user.avatarimg : ""} />
      </div>
      <div className="profile__editposition">
        <Button className="profile__editbutton" onClick={handleClickEdit}>
          Edit Profile
        </Button>
      </div>
      <div className="profile__displaynameposition">
        <h3>{user ? user.nickname : null}</h3>
      </div>
      <div className="profile__descriptionposition">
        <p className="profile__description">wo shi sha dan</p>
      </div>
    </div>
  );
}
