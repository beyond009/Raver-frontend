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
  async handleAuthenticated(authClient) {
    console.log("login in success!");
    const identity = await authClient.getIdentity();
    this.props.onloginChange(true);
    history.push({ pathname: "/home" });
  }
  async handleLogin() {
    const authClient = await AuthClient.create();
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      identityProvider:
        "http://localhost:8000/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai",
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleLogin}></button>
      </div>
    );
  }
}
