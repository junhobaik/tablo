import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setDragStatus } from "../../redux/actions";
import "./index.scss";

class CurrentTabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: []
    };
    this.dragStart = this.dragStart.bind(this);
  }

  dragStart(event) {
    console.log("dargStart", event.target);
    const row = parseInt(event.target.attributes.row.value);
    this.props.onSetDragStatus(null, null, this.state.tabs[row])
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
          key={"current-tab-" + i}
          draggable="true"
          onDragStart={this.dragStart}
          row={i}
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
let mapDispatchToProps = dispatch => {
  return {
    onSetDragStatus: (col, row, item) => dispatch(setDragStatus(col, row, item))
  };
};

let mapStateToProps = state => {
  return {
    tabList: state.tab.tabList
  };
};

CurrentTabList.propTypes = {};

CurrentTabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentTabList);

export default CurrentTabList;
