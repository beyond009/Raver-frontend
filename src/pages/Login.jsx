import React, { Component } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Button } from "@material-ui/core";
import dfinityicon from "../../assets/dfinity.png";
import avatar_1 from "../../assets/avatar-1.png";
import avatar_4 from "../../assets/avatar-4.png";
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
        {/* <img src={avatar_4}/> */}
        <div className="login_position">
          <Button
            variant="contained"
            onClick={this.props.handleLogin}
            className="Login_LoginButton"
          >
            Login With &nbsp;&nbsp;{" "}
            <img src={dfinityicon} style={{ height: "25px" }} />
          </Button>
        </div>
      </div>
    );
  }
}
