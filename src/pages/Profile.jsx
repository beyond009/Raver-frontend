import React, { Component } from "react";
import Feed from "../compoents/Feed";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import history from "../History";
import "./Signup.css";
const Profile = (props) => {
  return (
    <div>
      <div className="Signup_Avatar">
        <Avatar src={props.user ? props.user.avatarimg : ""} />
      </div>
      <div className="Signup_Form">
        <form noValidate autoComplete="off">
          <Input
            id="avatar_img"
            placeholder="avatar img url"
            inputProps={{ "aria-label": "description" }}
          />
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
          {/* <Button onClick={this.handleSubmit.bind(this)}>Submit</Button> */}
        </form>
      </div>
    </div>
  );
};
export default Profile;
