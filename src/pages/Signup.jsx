import React, { Component } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    const authActor = this.props.authActor;
  }
  async handleSubmit() {
    var username = document.getElementById("name").value;
    var userid = document.getElementById("id").value;
    console.log(username);
    console.log(userid);
    var a = await this.authActor.getValue();
    //sumbit to backEnd canister

    console.log(a);
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
              id="name"
              placeholder="name"
              inputProps={{ "aria-label": "description" }}
            />
            <Input
              id="id"
              placeholder="id"
              inputProps={{ "aria-label": "description" }}
            />
            <Button onClick={this.handleSubmit}>Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}
