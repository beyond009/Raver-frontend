import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PostPage from "./pages/PostPage";
import Waiting from "./pages/Waiting";
import Signup from "./pages/Signup";
import Sidebar from "./compoents/Sidebar";
import Widgets from "./compoents/Widgets";
import history from "./History";
import Feed from "./compoents/Feed";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { isDelegationValid } from "@dfinity/authentication";
import { idlFactory } from "./declarations/backend/backend.did.js";
import canisterIds from "../.dfx/local/canister_ids.json";
import { DelegationIdentity } from "@dfinity/identity";
import { authActor, updateAuthActor } from "./redux/features/authActor";
import { updateUser } from "./redux/features/user";
import "./App.css";
const canisterId =
  new URLSearchParams(window.location.search).get("backend") ||
  canisterIds.backend.local;
const App = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const { authActor } = useSelector((state) => state);
  const goToLoginPage = () =>
    history.push({
      pathname: "/login",
    });

  async function getActor(authClient) {
    let tIdentity = await authClient.getIdentity();
    let principal = tIdentity.getPrincipal();
    let principalString = principal.toText();
    const agent = new HttpAgent({
      identity: tIdentity,
      host: "http://localhost:8000",
    });

    agent.fetchRootKey();

    let tAuthActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId,
    });

    dispatch(updateAuthActor(tAuthActor));
    let isSigned = await tAuthActor.isUserExist();
    if (!isSigned) {
      await tAuthActor.addUser(principalString, "User", "");
      let res = await tAuthActor.getShowUserProfileByPrincipal();
      dispatch(updateUser(res));
    } else {
      let res = await tAuthActor.getShowUserProfileByPrincipal();
      dispatch(updateUser(res));
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
      setIsLogin(true);
      getActor(authClient);
    } else {
      setIsLogin(false);
      goToLoginPage();
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogin = async (lors) => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider:
        "http://localhost:8000/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai",
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
    });
  };

  return (
    <div className="app">
      {isLogin ? <Sidebar /> : null}
      <Switch>
        <Route
          exact
          path="/login"
          component={(props) => {
            let obj = Object.assign({}, { handleLogin: handleLogin }, props);
            return <Login {...obj} />;
          }}
        />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/waiting" component={Waiting} />
        <Route path="/post/:tid" component={PostPage} />
      </Switch>
      {isLogin ? <Widgets /> : null}
    </div>
  );
};

export default App;
