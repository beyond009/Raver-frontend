import React, { Component } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { idlFactory, canisterId } from "dfx-generated/counter";
import history from "../History";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
    };
  }

  render() {
    return (
      <div>
        <button onClick={this.props.handleLogin}></button>
      </div>
    );
  }
}
