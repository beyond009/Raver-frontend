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
  },
}));
const EditProfile = (props) => {
  const { user, authActor } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [avatarimg, setAvatarimg] = useState();
  const [disableb, setDisableb] = useState(false);
  const [displayNameError, setDisplayNameError] = useState(false);
  const [displayNameMessage, setDisplayNameMessage] = useState();
  const [usernameError, setUsernameError] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState();
  const [avatarimgError, setAvatarimgError] = useState(false);
  const [avatarimgMessage, setAvatarimgMessage] = useState();
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionMessage, setDescriptionMessage] = useState();
  async function handleSubmit() {
    let nickname = document.getElementById("name").value;
    let avatar_img = document.getElementById("avatar_img").value;
    let description = document.getElementById("description").value;
    let username = document.getElementById("username").value;

    console.log(nickname);
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
  function handleDispalyName(e) {
    if (e.target.value.length >= 10) {
      setDisplayNameError(true);
      setDisplayNameMessage("Display name need to be less than 11 characters");
      setDisableb(true);
    } else {
      setDisplayNameError(false);
      setDisplayNameMessage("");
      if (!usernameError && !avatarimgError && !descriptionError)
        setDisableb(false);
    }
  }
  function handleAvatarimg(e) {
    if (e.target.value.length >= 220) {
      setAvatarimgError(true);
      setAvatarimgMessage("Url too long, try another one pls.");
      setDisableb(true);
    } else {
      setAvatarimgError(false);
      setAvatarimgMessage("");
      if (!usernameError && !descriptionError && !displayNameError)
        setDisableb(false);
    }
  }
  function handleDescription(e) {
    if (e.target.value.length >= 50) {
      setDescriptionError(true);
      setDescriptionMessage("Description need to be less than 51 characters");
      setDisableb(true);
    } else {
      setDescriptionError(false);
      setDescriptionMessage("");
      if (!usernameError && !avatarimgError && !displayNameError)
        setDisableb(false);
    }
  }
  function handleUsername(e) {
    if (e.target.value.length >= 64) {
      setUsernameError(true);
      setUsernameMessage("Username need to be less than 65 characters");
      setDisableb(true);
    } else {
      setUsernameError(false);
      setUsernameMessage("");
      if (!avatarimgError && !descriptionError && !displayNameError)
        setDisableb(false);
    }
  }

  return (
    <div className="edit__profile">
      <div className="signup__form">
        <div className="signup_Avatar">
          <Avatar src={avatarimg ? avatarimg : ""} className={classes.large} />
        </div>
        <div className="profile__principal__box">
          <div className="profile__your">Your Principal:</div>
          <div className="profile__principal">
            <br /> {user ? user.uid.toText() : null}
          </div>
        </div>
        <form noValidate autoComplete="off">
          <div className="signup__form__son">
            <TextField
              id="avatar_img"
              style={{ margin: 8 }}
              label="avatar img url"
              error={avatarimgError}
              onChange={(e) => handleAvatarimg(e)}
              helperText={avatarimgMessage}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={user ? user.avatarimg : null}
            />
            <br />
            <br />
            <TextField
              id="name"
              style={{ margin: 8 }}
              label="display name"
              onChange={(e) => handleDispalyName(e)}
              error={displayNameError}
              helperText={displayNameMessage}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={user ? user.nickname : null}
            />
            <br />
            <br />
            <TextField
              id="description"
              style={{ margin: 8 }}
              label="description"
              error={descriptionError}
              onChange={(e) => handleDescription(e)}
              helperText={descriptionMessage}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={user ? user.bio : null}
            />
            <br />
            <br />
            <TextField
              id="username"
              style={{ margin: 8 }}
              label="username"
              error={usernameError}
              onChange={(e) => handleUsername(e)}
              helperText={usernameMessage}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={user ? user.username : null}
            />
            <br />
          </div>
        </form>{" "}
        <br />
        <br />
        <div className="submit__button">
          <Button onClick={handleSubmit} disabled={disableb}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
