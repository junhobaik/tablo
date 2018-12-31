import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

class index extends Component {
  render() {
    return (
      <div id="LinkCart">
        <div className="list-wrap">
          <div className="list-title">
            <p>Link Cart</p>
          </div>
          <ul className="list"></ul>
        </div>
      </div>
    );
  }
}

index.propTypes = {};

export default index;
