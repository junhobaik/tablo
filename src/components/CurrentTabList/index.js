import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

class CurrentTabList extends Component {
  render() {
    const tabList = this.props.tabs.map((v, i) => {
      return (
        <li className="tab" key={"tab-" + v.id}>
          <div className="favicon">
            {v.favIconUrl ? <img src={v.favIconUrl} alt="favicon" /> : null}
          </div>
          <a href={v.url}>{v.title}</a>
        </li>
      );
    });

    return (
      <div id="CurrentTabList">
        <div className="list-wrap">
          <div className="list-title">
            <p>[TITLE]</p>
          </div>
          <ul className="list">{tabList}</ul>
        </div>
      </div>
    );
  }
}

CurrentTabList.propTypes = {};

export default CurrentTabList;
