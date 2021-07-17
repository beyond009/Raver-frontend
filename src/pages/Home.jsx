import React, { Component } from "react";
import Feed from "../compoents/Feed";
import TweetBox from "../compoents/TweetBox";
import "./Home.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { update: false, user: null };
    this.setUpdate = this.setUpdate.bind(this);
  }
  setUpdate() {
    let tmp = !this.state.update;
    console.log(tmp);
    this.setState({ update: tmp });
  }
  async getUserOnMount() {
    let tmp = await this.props.authActor.getUserProfile();
    this.setState({ user: tmp });
  }
  componentDidMount() {
    this.getUserOnMount();
    console.log("home");
  }
  render() {
    return (
      <div className="home">
        <div className="home__header">
          <h2>Home</h2>
        </div>
        {/* <TweetBox
          authActor={this.props.authActor}
          setUpdate={this.setUpdate}
          user={this.state.user}
        /> */}
        <Feed
          authActor={this.props.authActor}
          update={this.state.update}
          user={this.state.user}
        />
      </div>
    );
  }
}
