import React, { Component } from "react";
import Feed from "../compoents/Feed";
import TweetBox from "../compoents/TweetBox";
import "./Home.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { update: false };
    this.setUpdate = this.setUpdate.bind(this);
  }
  setUpdate() {
    let tmp = !this.state.update;
    console.log(tmp);
    this.setState({ update: tmp });
  }
  componentDidMount() {
    console.log("home");
  }
  render() {
    return (
      <div className="home">
        <div className="home__header">
          <h2>Home</h2>
        </div>
        <TweetBox authActor={this.props.authActor} setUpdate={this.setUpdate} />
        <Feed authActor={this.props.authActor} update={this.state.update} />
      </div>
    );
  }
}
