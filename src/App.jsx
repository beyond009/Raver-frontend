import React, { Component } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import Signup from "./pages/Signup";
import Sidebar from "./compoents/Sidebar";
import Widgets from "./compoents/Widgets";
import history from "./History";
import Feed from "./compoents/Feed";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      identity: null,
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
    this.setState({ identity: identity });
  }
  async handleLogin() {
    console.log("handle login");
    const authClient = await AuthClient.create();
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      identityProvider:
        "http://localhost:8080/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai",
    });
  }
  componentWillMount() {
    // (async () => {
    //   console.log("Check login!");
    //   const authClient = await AuthClient.create();
    //   if ((await authClient.isAuthenticated()) ) {
    //     handleAuthenticated(authClient);
    //     this.setState({ islogin: true });
    //   }
    //   if (!this.state.islogin) {
    //     console.log("go to login page");
    //     this.goToLoginPage();
    //   }
    // })();
    // history.push({ pathname: "/home" });
  }

  render() {
    return (
      <div className="app">
        {this.state.islogin ? <Sidebar /> : null}
        {/* <Sidebar /> */}
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
          <Route
            exact
            path="/home"
            component={(props) => {
              let obj = Object.assign(
                {},
                { identity: this.state.identity },
                props
              );
              return <Home {...obj} />;
            }}
          />
          <Route
            exact
            path="/profile"
            component={(props) => {
              let obj = Object.assign(
                {},
                { identity: this.state.identity },
                props
              );
              return <Login {...obj} />;
            }}
          />
          <Route exact path="/signup" compoent={Profile} />
          {/* <Route exact path="/" compoent={} /> */}
        </Router>
        {this.state.islogin ? <Widgets /> : null}
        {/* <Widgets /> */}
      </div>
    );
  }
}

export default App;
