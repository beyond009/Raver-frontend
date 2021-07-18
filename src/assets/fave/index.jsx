import React, { Component } from "react";
import { PropTypes } from "prop-types";

import "./index.css";

class Fave extends Component {
  render() {
    const { size, fave } = this.props;
    const style = {
      width: size,
      height: size,
    };
    const animation_class = fave ? "fave-ani" : "";
    return (
      <div className={`twitter-fave ${animation_class}`} style={style}></div>
    );
  }
}

Fave.propTypes = {
  size: PropTypes.number,
  fave: PropTypes.bool,
};

export default Fave;
