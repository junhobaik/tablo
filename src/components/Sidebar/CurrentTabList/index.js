import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./index.scss";

class CurrentTabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  getAllTabs() {
    chrome.windows.getAll({ populate: true }, windows => {
      let temp = [];
      for (let window of windows) {
        for (let tab of window.tabs) {
          const { id, title, url, favIconUrl } = tab;
          temp.push({ title, url, favIconUrl });
        }
      }
      this.setState({
        list: temp
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
    const linkList = (this.state.list || []).map((v, i) => {
      return (
        <li
          className="link"
          key={"link-" + i}
          draggable="true"
          onDragStart={this.dragStart}
          row={i}
        >

          <a href={v.url} target="_blank" draggable="false">
          
            <div className="favicon">
              {v.favIconUrl ? (
                <img src={v.favIconUrl} alt="favicon" draggable="false" />
              ) : (
                <div className="noFavIcon">
                  <span>{v.title[0]}</span>
                </div>
              )}
            </div>

            <span className="link-title">{v.title}</span>
          </a>
        </li>
      );
    });

    return (
      <div id="CurrentTabList">
        <div className="link-list">
          <div className="link-list-title">
            <p>Current Tabs</p>
          </div>
          <ul className="list">{linkList}</ul>
        </div>
      </div>
    );
  }
}
let mapDispatchToProps = dispatch => {
  return {};
};

let mapStateToProps = state => {
  return {};
};

CurrentTabList.propTypes = {};

CurrentTabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentTabList);

export default CurrentTabList;
