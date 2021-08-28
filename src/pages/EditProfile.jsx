import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Feed from "../compoents/Feed";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import history from "../History";
import { updateUser } from "../redux/features/user";
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
  const { user, authActor } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [avatarimg, setAvatarimg] = useState();
  async function handleSubmit() {
    let nickname = document.getElementById("name").value;
    let avatar_img = document.getElementById("avatar_img").value;
    let description = document.getElementById("description").value;
    let username = document.getElementById("username").value;
    setAvatarimg(avatar_img);
    Promise.all([
      authActor.changeUserProfile(nickname, username, avatar_img),
      authActor.putBio(description),
    ]).then(async () => {
      let tu = await authActor.getShowUserProfileByPrincipal();
      dispatch(updateUser(tu));
    });
  }
  useEffect(() => {
    if (user) {
      setAvatarimg(user.avatarimg);
    }
  }, [user]);
  return (
    <div className="edit__profile">
      <div className="signup__form">
        <div className="signup_Avatar">
          <Avatar src={avatarimg ? avatarimg : ""} className={classes.large} />
        </div>
        <div className="profile__your">Your Principal:</div>
        <div className="profile__principal">
          <br /> {user ? user.uid.toText() : null}
        </div>
        <form noValidate autoComplete="off">
          <Input
            id="avatar_img"
            placeholder="avatar img url"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
            defaultValue={user ? user.avatarimg : null}
          />
          <br />
          <br />
          <Input
            id="name"
            placeholder="nickname"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
            defaultValue={user ? user.nickname : null}
          />
          <br />
          <br />
          <Input
            id="description"
            placeholder="description"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
            defaultValue={user ? user.bio : null}
          />
          <br />
          <br />
          <Input
            id="username"
            placeholder="username"
            inputProps={{ "aria-label": "description" }}
            className="signup__input"
            defaultValue={user ? user.username : null}
          />
          <br />
        </form>{" "}
        <br />
        <br />
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
