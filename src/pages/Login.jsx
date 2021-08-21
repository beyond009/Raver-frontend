import React, { Component } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Button } from "@material-ui/core";
import dfinityicon from "../../assets/dfinity.png";
import avatar_1 from "../../assets/avatar-1.png";
import avatar_2 from "../../assets/avatar-2.png";
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
  render() {
    return (
      <div className="login">
        <div className="login_position">
          <Button
            variant="contained"
            onClick={this.props.handleLogin}
            className="Login_LoginButton"
          >
            Login With &nbsp;&nbsp;{" "}
            <img src={dfinityicon} style={{ height: "23px" }} />
          </Button>
        </div>
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
