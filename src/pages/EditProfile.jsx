import React, { Component, useState, useEffect } from "react";
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
    "margin-top": "40px",
    "margin-left": "280px",
    "margin-right": "290px",
    "margin-bottom": "50px",
  },
}));
const EditProfile = (props) => {
  const classes = useStyles();
  const [avatarimg, setAvatarimg] = useState();
  async function handleSubmit() {
    let username = document.getElementById("name").value;
    let avatar_img = document.getElementById("avatar_img").value;
    setAvatarimg(avatar_img);
    let flag = await props.authActor.changeUserProfile(username, avatar_img);
  }
  useEffect(() => {}, []);
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
        <br /> {props.principal ? props.principal.toText() : null}
      </div>

      <div className="signup__form">
        <form noValidate autoComplete="off">
          <Input
            id="avatar_img"
            placeholder="avatar img url"
            inputProps={{ "aria-label": "description" }}
          />
          <br />
          <br />
          <Input
            id="name"
            placeholder="name"
            inputProps={{ "aria-label": "description" }}
          />
          {/* <Input
        id="id"
        placeholder="id"
        inputProps={{ "aria-label": "description" }}
      /> */}
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
