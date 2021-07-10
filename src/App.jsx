import React, { Component, useState, useEffect } from "react";
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
import { idlFactory, canisterId } from "dfx-generated/counter";
import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom";
import "./App.css";

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     islogin: false,
  //     identity: null,
  //   };
  // }
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  // onloginChange = (isl = false) => {
  //   this.setState({ islogin: isl });
  // };
  var authClient = null;
  var authActor = null;
  var identity = null;
  const goToLoginPage = () =>
    history.push({
      pathname: "/login",
    });
  // async handleAuthenticated(authClient) {
  //   this.setState({ islogin: true });
  //   history.push({
  //     pathname: "/home",
  //   });
  //   console.log("login in success!");
  //   const identity = await authClient.getIdentity();
  //   this.setState({ identity: identity });
  // }
  async function handleAuthenticated(authClient) {
    setIsLogin(true);
    console.log("login success");
    history.push({ pathname: "/home" });
    identity = await authClient.getIdentity();
    // authActor = await Actor.create;
    const agent = new HttpAgent({
      identity: identity,
      host: "http://localhost:8000",
    });
    console.log(agent);
    await agent.fetchRootKey();
    console.log("fetchRootKey");
    authActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId,
    });
    console.log(authActor);
    console.log(identity);
    let tmp = await authActor.getValue();
    console.log(tmp);
  }
  useEffect(async () => {
    console.log("Check login!");
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    } else {
      console.log("go to login page!");
      goToLoginPage();
    }
  }, []);
  const handleLogin = async () => {
    console.log("handle login");
    const authClient = await AuthClient.create();
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      identityProvider:
        "http://localhost:8080/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai",
    });
  };

  return (
    <div className="app">
      {isLogin ? <Sidebar /> : null}
      {/* <Sidebar /> */}
      <Router history={history}>
        <Route
          exact
          path="/login"
          component={(props) => {
            let obj = Object.assign({}, { handleLogin: handleLogin }, props);
            return <Login {...obj} />;
          }}
        />
        <Route
          exact
          path="/home"
          component={(props) => {
            let obj = Object.assign({}, { authActor: authActor }, props);
            return <Home {...obj} />;
          }}
        />
        <Route
          exact
          path="/profile"
          component={(props) => {
            let obj = Object.assign({}, { authActor: authActor }, props);
            return <Login {...obj} />;
          }}
        />
        <Route exact path="/signup" compoent={Profile} />
        {/* <Route exact path="/" compoent={} /> */}
      </Router>
      {isLogin ? <Widgets /> : null}
      {/* <Widgets /> */}
    </div>
  );
};

export default App;
