import React, { Component } from "react";
import ReactDOM from "react-dom";
import Feed from "../compoents/Feed";
import TweetBox from "../compoents/TweetBox";
import "./Home.css";
export default class Home extends Component {
  componentDidMount() {
    const dHome = document.getElementsByClassName("home")[0];
    const scrollTop = sessionStorage.getItem("scrollTopHome") || 0;
    ReactDOM.findDOMNode(dHome).scrollTo(0, scrollTop);
  }
  componentWillUnmount() {
    const dHome = document.getElementsByClassName("home")[0];
    sessionStorage.setItem("scrollTopHome", dHome.scrollTop);
  }
  render() {
    return (
      <div className="home">
        <div className="home__header">
          <h2>Home</h2>
        </div>
        <Feed />
      </div>
    );
  }
}
