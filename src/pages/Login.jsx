import React, { Component } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Button } from "@material-ui/core";
import dfinityicon from "../assets/dfinity.png";

import { idlFactory, canisterId } from "dfx-generated/backend";
import history from "../History";
import "./Login.css";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
    };
  }
  // toSignup() {
  //   history.push({ pathname: "/signup" });
  // }
  render() {
    return (
      <div>
        <Button
          variant="contained"
          onClick={this.props.handleLogin}
          className="Login_LoginButton"
        >
          Login With &nbsp;&nbsp;{" "}
          <img src={dfinityicon} style={{ height: "16px" }} />
        </Button>
        {/* <Button
          variant="contained"
          onClick={this.toSignup}
          className="Login_LoginButton"
        >
          Signup With &nbsp;&nbsp;{" "}
          <img src={dfinityicon} style={{ height: "16px" }} />
        </Button> */}
      </div>
    );
  }
}
