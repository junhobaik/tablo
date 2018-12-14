import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.scss";

class TabList extends Component {
  render() {
    return (
      <div id="TabList">
        <div className="add-column">
          <span>+ Add column</span>
        </div>
      </div>
    );
  }
}

TabList.propTypes = {};

export default TabList;
