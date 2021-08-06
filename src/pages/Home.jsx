import React, { Component } from "react";
import Feed from "../compoents/Feed";
import TweetBox from "../compoents/TweetBox";
import "./Home.css";
export default class Home extends Component {
  async getUserOnMount() {}
  componentDidMount() {
    console.log("home");
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
