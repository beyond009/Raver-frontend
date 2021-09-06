import React, { Component } from "react";
import { LoopCircleLoading } from "react-loadingg";
export default class Waiting extends Component {
  render() {
    return (
      <div className="Waiting">
        <LoopCircleLoading color="rgb(15, 20, 25)" />
      </div>
    );
  }
}
