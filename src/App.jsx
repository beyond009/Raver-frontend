import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  BrowserRouter,
  Route,
  Switch,
  Link,
  Router,
} from "react-router-dom";
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
import Follower from "./pages/Follower";
import Following from "./pages/Following";
import Wallet from "./pages/Wallet";
import Feed from "./compoents/Feed";
import Main from "./pages/Main";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { isDelegationValid } from "@dfinity/authentication";
import { idlFactory } from "./declarations/backend/backend.did.js";
import { LoopCircleLoading } from "react-loadingg";
import { DelegationIdentity } from "@dfinity/identity";
import { authActor, updateAuthActor } from "./redux/features/authActor";
import { updateUser } from "./redux/features/user";
import "./App.css";
import Global from "./pages/Global";
const App = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { authActor } = useSelector((state) => state);

  async function getActor(authClient) {
    let tIdentity = await authClient.getIdentity();
    let principal = tIdentity.getPrincipal();
    let principalString = principal.toText();
    const agent = new HttpAgent({
      identity: tIdentity,
      // host: "ic0.app",
      host: "127.0.0.1:8000",
    });

    agent.fetchRootKey();

    let tAuthActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: "rno2w-sqaaa-aaaaa-aaacq-cai",
      // canisterId: "r7inp-6aaaa-aaaaa-aaabq-cai",
    });
    dispatch(updateAuthActor(tAuthActor));
    let isSigned = await tAuthActor.isUserExist();
    if (!isSigned) {
      await tAuthActor.addUser(principalString, "User", "");
      let res = await tAuthActor.getShowUserProfileByPrincipal();
      dispatch(updateUser(res));
      setIsLoading(false);
    } else {
      let res = await tAuthActor.getShowUserProfileByPrincipal();
      dispatch(updateUser(res));
      setIsLoading(false);
    }
  }

  async function handleAuthenticated(authClient) {
    setIsLogin(true);
    getActor(authClient);
  }

  async function checkLogin() {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    } else {
      setIsLogin(false);
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

  return isLogin ? (
    0 ? (
      <LoopCircleLoading color="rgb(15, 20, 25)" />
    ) : (
      <div className="app">
        <Route path="/dao" component={Sidebar} />
        {/* <Sidebar /> */}
        <Switch>
          <Route exact path="/dao/home" component={Home} />
          ent={Profile} />
          <Route exact path="/dao/editprofile" component={EditProfile} />
          <Route exact path="/dao/waiting" component={Waiting} />
          <Route exact path="/dao/wallet" component={Wallet} />
          <Route path="/dao/post/:tid" component={PostPage} />
          <Route path="/dao/global" component={Global} />
          <Route path="/dao/profile/:username/follower" component={Follower} />
          <Route
            path="/dao/profile/:username/following"
            component={Following}
          />
          <Route component={Main} />
        </Switch>
        <Route path="/dao" component={Widgets} />
      </div>
    )
  ) : (
    <div className="app">
      <Login handleLogin={handleLogin} />
    </div>
  );
};

export default App;
