import React, { Component } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import Signup from "./pages/Signup";
import Sidebar from "./compoents/Sidebar";
import Widgets from "./compoents/Widgets";
import history from "./History";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
    };
  }

  onloginChange = (isl = false) => {
    this.setState({ islogin: isl });
  };
  goToLoginPage = () =>
    history.push({
      pathname: "/login",
    });
  async handleAuthenticated(authClient) {
    this.setState({ islogin: true });
    history.push({
      pathname: "/home",
    });
    console.log("login in success!");
    const identity = await authClient.getIdentity();
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
  componentWillMount() {
    (async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
        this.setState({ islogin: true });
      }
      if (!this.state.islogin) {
        this.goToLoginPage();
      }
    })();
  }

  render() {
    return (
      <div className="app">
        <div>
          {this.state.islogin ? <Sidebar /> : null}
          <Router history={history}>
            <Route
              exact
              path="/login"
              component={(props) => {
                let obj = Object.assign(
                  {},
                  { handleLogin: this.handleLogin },
                  props
                );
                return <Login {...obj} />;
              }}
            />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" compoent={Profile} />
            {/* <Route exact path="/" compoent={} /> */}
          </Router>
          {this.state.islogin ? <Widgets /> : null}
        </div>
      </div>
    );
  }
}

export default App;
