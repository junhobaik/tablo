import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LinkList from '../LinkList';
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
    return (
      <div id="CurrentTabList">
        <LinkList title="Current Tabs" list={this.state.list}/>
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
