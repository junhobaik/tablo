import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

class CurrentTabList extends Component {
  render() {
    const tabList = this.props.tabs.map((v, i) => {
      return (
        <div className="current-tab" key={"tab-" + i}>
          <img src={v.favIconUrl} alt="" />
          <a href={v.url}>{v.title}</a>
          <p>id={v.id}</p>
        </div>
      );
    });

    return <div>{tabList}</div>;
  }
}

CurrentTabList.propTypes = {};

export default CurrentTabList;
