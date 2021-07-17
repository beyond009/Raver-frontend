import React, { Component } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import history from "../History";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authActor = this.props.authActor;
  }
  async handleSubmit() {
    var username = document.getElementById("name").value;
    var avatar_img = document.getElementById("avatar_img").value;
    history.push({ pathname: "waiting" });
    var flag = await this.props.authActor.addUser(username, avatar_img);
  }
  render() {
    return (
      <div>
        <div className="Signup_Avatar">
          <Avatar>
            <PhotoCameraIcon />
          </Avatar>
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
            <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}
