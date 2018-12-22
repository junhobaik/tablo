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
  dragEnd(event) {
    console.log("dragEnd", event.target);
  }
  dragStart(event) {
    console.log("dargStart", event.target);
    event.dataTransfer.setData("text", event.target.id);
  }
  dragOver(event) {
    // console.log("onDragOver", event.target);
    event.preventDefault();
  }
  drop(event) {
    const data = event.dataTransfer.getData("text");
    console.log("drop", event.target, data);
    event.dataTransfer.clearData();
  }
  getAllTabs() {
    chrome.windows.getAll({ populate: true }, windows => {
      let temp = [];
      for (let window of windows) {
        for (let tab of window.tabs) {
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
        <li
          className="tab"
          key={"tab-" + v.id}
          draggable="true"
          onDragStart={this.dragStart}
          onDragEnd={this.dragEnd}
        >
          <div className="favicon">
            {v.favIconUrl ? (
              <img src={v.favIconUrl} alt="favicon" draggable="false" />
            ) : (
              <div className="noFavIcon">
                <span>{v.title[0]}</span>
              </div>
            )}
          </div>
          <a href={v.url} target="_blank" draggable="false">
            <span className="title-text">{v.title}</span>
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
