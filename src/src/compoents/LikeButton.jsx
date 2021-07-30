import React, { Component } from "react";
import Fave from "../../../assets/fave";
import "./LikeButton.css";
class FaveContainer extends Component {
  state = {
    fave: false,
  };

  handleClick = () => {
    if (this.state.fave) {
      this.setState({ fave: false });
    } else {
      this.setState({ fave: true });
    }
  };

  handleMouseHover = () => {
    if (this.state.fave) {
      this.setState({ fave: false });
    } else {
      this.setState({ fave: true });
    }
  };

  render() {
    return (
      <div>
        <div className="fave-container" onClick={this.handleClick}>
          <Fave size={63} fave={this.state.fave} />
        </div>
      </div>
    );
  }
}

export default FaveContainer;
