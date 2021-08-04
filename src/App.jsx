import React, { Component, useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Waiting from "./pages/Waiting";
import Signup from "./pages/Signup";
import Sidebar from "./compoents/Sidebar";
import Widgets from "./compoents/Widgets";
import history from "./History";
import Feed from "./compoents/Feed";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { isDelegationValid } from "@dfinity/authentication";
import { idlFactory, canisterId } from "dfx-generated/backend";
import { DelegationIdentity } from "@dfinity/identity";
import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom";
import "./App.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authActor, setAuthActor] = useState(null);
  const [upDate, setUpDate] = useState(true);
  const [user, setUser] = useState();
  const [principal, setPrincipal] = useState();
  var flag = false;
  var identity = null;

  const goToLoginPage = () =>
    history.push({
      pathname: "/login",
    });

  // function setIsLoginTrue() {
  //   setIsLogin(true);
  // }
  async function getActor(authClient) {
    if (authActor === null) {
      identity = await authClient.getIdentity();
      if (identity instanceof DelegationIdentity) {
        console.log("delegationidentity");
        console.log(identity.getDelegation());
        console.log(isDelegationValid(identity.getDelegation()));
      }
      const principal = identity.getPrincipal();
      setPrincipal(principal);
      const agent = new HttpAgent({
        identity: identity,
        host: "http://ryjl3-tyaaa-aaaaa-aaaba-cai.localhost:8000",
      });
      console.log(agent);
      await agent.fetchRootKey();
      let tauthActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterId,
      });
      setAuthActor(tauthActor);
      let isSigned = await tauthActor.ifUserExisted();
      if (!isSigned) {
        await tauthActor.addUser("User", "");
      }
    }
  }
  async function handleAuthenticated(authClient) {
    setIsLogin(true);
    history.push({ pathname: "/home" });
    getActor(authClient);
  }

  async function checkLogin() {
    console.log("Check login!");
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      // handleAuthenticated(authClient);
      setIsLogin(true);
      getActor(authClient);
    } else {
      setIsLogin(false);
      console.log("go to login page!");
      goToLoginPage();
    }
  }
  useEffect(() => {
    checkLogin();
  }, []);

  // onClick login button
  const handleLogin = async (lors) => {
    const authClient = await AuthClient.create();
    await authClient.login({
      // maxTimeToLive: BigInt("0x7f7f7f7f7f"),
      identityProvider:
        "http://localhost:8000/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai",
      onSuccess: async () => {
        // history.push({ pathname: "waiting" });
        handleAuthenticated(authClient);
      },
    });
  };

  return (
    <div className="app">
      {isLogin ? <Sidebar /> : null}
      {/* <Sidebar /> */}

      <Switch>
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
            let obj = Object.assign(
              {},
              { authActor: authActor, principal: principal },
              props
            );
            return <Profile {...obj} />;
          }}
        />
        <Route
          exact
          path="/editprofile"
          component={(props) => {
            let obj = Object.assign(
              {},
              { authActor: authActor, principal: principal },
              props
            );
            return <EditProfile {...obj} />;
          }}
        />
        <Route exact path="/waiting" component={Waiting} />
      </Switch>

      {isLogin ? <Widgets /> : null}
      {/* <Widgets /> */}
    </div>
  );
};

export default App;
