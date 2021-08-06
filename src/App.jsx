import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom";
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
import { authActor, updateAuthActor } from "./redux/features/authActor";
import { updateIdentity } from "./redux/features/identity";
import { updateUser } from "./redux/features/user";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const { authActor, identity } = useSelector((state) => state);
  const goToLoginPage = () =>
    history.push({
      pathname: "/login",
    });

  async function getActor(authClient) {
    let tIdentity = await authClient.getIdentity();
    let principal = tIdentity.getPrincipal();
    let principalString = principal.toText();
    dispatch(updateIdentity(principal));
    if (tIdentity instanceof DelegationIdentity) {
      console.log(tIdentity.getDelegation());
    }
    const agent = new HttpAgent({
      identity: tIdentity,
      host: "http://ryjl3-tyaaa-aaaaa-aaaba-cai.localhost:8000",
    });

    agent.fetchRootKey();

    let tAuthActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId,
    });
    console.log(principal, identity);
    dispatch(updateAuthActor(tAuthActor));
    let isSigned = await tAuthActor.isUserExist(principal);
    console.log(true);
    if (!isSigned) {
      await tAuthActor.addUser(principalString, "User", "");
      let res = await tAuthActor.getUserProfile(principal);
      dispatch(updateUser(res));
    } else {
      let res = await tAuthActor.getUserProfile(principal);
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

  const handleLogin = async (lors) => {
    const authClient = await AuthClient.create();
    await authClient.login({
      // maxTimeToLive: BigInt("0x7f7f7f7f7f"),
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
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/waiting" component={Waiting} />
      </Switch>
      {isLogin ? <Widgets /> : null}
    </div>
  );
};

export default App;
