import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.scss";

class CurrentTabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: []
    };
  }

  getAllTabs() {
    chrome.windows.getAll({ populate: true }, windows => {
      let temp = [];
      for (let window of windows) {
        for (let tab of window.tabs) {
          console.log(tab);
          const { id, title, url, favIconUrl } = tab;
          temp.push({ id, title, url, favIconUrl });
        }
      }
      this.setState({
        tabs: temp
      });
    });
  }

  componentDidMount() {
    this.getAllTabs();

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete") this.getAllTabs();
    });

    chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
      this.getAllTabs();
    });
  }

  render() {
    const tabList = this.state.tabs.map((v, i) => {
      return (
        <li className="tab" key={"tab-" + v.id}>
          <div className="favicon">
            {v.favIconUrl ? <img src={v.favIconUrl} alt="favicon" /> : null}
          </div>
          <a href={v.url} target="_blank">
            {v.title}
          </a>
        </li>
      );
    });

    return (
      <div id="CurrentTabList">
        <div className="list-wrap">
          <div className="list-title">
            <p>Current Tabs</p>
          </div>
          <ul className="list">{tabList}</ul>
        </div>
      </div>
    );
  }
}

CurrentTabList.propTypes = {};

export default CurrentTabList;
