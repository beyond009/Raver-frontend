import React, { Component, useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Waiting from "./pages/Waiting";
import Signup from "./pages/Signup";
// import Signup from "./pages/Signup";
import Sidebar from "./compoents/Sidebar";
import Widgets from "./compoents/Widgets";
import history from "./History";
import Feed from "./compoents/Feed";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { idlFactory, canisterId } from "dfx-generated/backend";
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
  const [authActor, setAuthActor] = useState(null);
  const [upDate, setUpDate] = useState(true);
  // onloginChange = (isl = false) => {
  //   this.setState({ islogin: isl });
  // };
  var flag = false;
  var authClient = null;
  // var authActor = null;
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
  function setIsLoginTrue() {
    setIsLogin(true);
  }
  async function getActor(authClient) {
    return authActor;
  }
  async function handleAuthenticated(authClient) {
    if (authActor === null) {
      identity = await authClient.getIdentity();
      const principal = identity.getPrincipal();
      console.log(principal);
      const agent = new HttpAgent({
        // identity: identity,
        host: "http://localhost:8000",
      });
      console.log(agent);
      await agent.fetchRootKey();
      console.log("fetchRootKey");
      let tauthActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterId,
      });
      setAuthActor(tauthActor);
      var isSigned = await tauthActor.ifUserExisted();
      console.log("has user", isSigned);
      if (isSigned) {
        setUpDate(flag);
        flag = !flag;
        setIsLogin(true);
        history.push({ pathname: "/home" });
      } else {
        history.push({ pathname: "/signup" });
      }
    }
  }
  useEffect(async () => {
    console.log("Check login!");
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    } else {
      setIsLogin(false);
      console.log("go to login page!");
      goToLoginPage();
    }
  }, []);
  const handleLogin = async (lors) => {
    const authClient = await AuthClient.create();
    await authClient.login({
      onSuccess: async () => {
        history.push({ pathname: "waiting" });
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
          path="/signup"
          component={(props) => {
            let obj = Object.assign(
              {},
              { authActor: authActor, setIsLoginTrue: setIsLoginTrue },
              props
            );
            return <Signup {...obj} />;
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
        <Route exact path="/waiting" component={Waiting} />
      </Router>
      {isLogin ? <Widgets /> : null}
      {/* <Widgets /> */}
    </div>
  );
};

export default App;
