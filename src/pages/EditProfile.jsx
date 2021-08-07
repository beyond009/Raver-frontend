import React, { Component, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Feed from "../compoents/Feed";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import history from "../History";
import "./EditProfile.css";
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
const EditProfile = (props) => {
  const { identity, user, authActor } = useSelector((state) => state);
  const classes = useStyles();
  const [avatarimg, setAvatarimg] = useState();
  async function handleSubmit() {
    let nickname = document.getElementById("name").value;
    let avatar_img = document.getElementById("avatar_img").value;
    let description = document.getElementById("description").value;
    let username = document.getElementById("username").value;
    setAvatarimg(avatar_img);
    let flag = await authActor.changeUserProfile(
      nickname,
      username,
      avatar_img
    );
  }
  useEffect(() => {
    if (user) {
      setAvatarimg(user.avatarimg);
    }
  }, [user]);
  return (
    <div className="edit__profile">
      <div>
        <Avatar
          src={avatarimg ? avatarimg : ""}
          className="Signup_Avatar"
          className={classes.large}
        />
      </div>
      <div className="profile__your">Your Principal:</div>
      <div className="profile__principal">
        <br /> {identity ? identity.toText() : null}
      </div>

      <div className="signup__form">
        <form noValidate autoComplete="off">
          <Input
            id="avatar_img"
            placeholder="avatar img url"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
          />
          <br />
          <br />
          <Input
            id="name"
            placeholder="nickname"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
          />
          <br />
          <br />
          <Input
            id="description"
            placeholder="description"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
          />
          <br />
          <br />
          <Input
            id="username"
            placeholder="username"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
          />
          <br />
        </form>{" "}
        <br />
        <br />
        <Button onClick={handleSubmit} className="submit__button">
          Submit
        </Button>
      </div>
    </div>
  );
};
export default EditProfile;
