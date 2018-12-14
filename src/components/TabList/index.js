import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addColumn } from "../../redux/actions";
import "./index.scss";

class TabList extends Component {
  render() {
    const tabListObj = this.props.tabList.map((v, i) => {
      const tabsObj = v.tabs.map((v, i) => {
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
        <div className="tab-list" key={`tab-list-${v.num}`}>
          <div className="top">
            <h2>{v.title}</h2>
            <div>*</div>
          </div>
          <ul>{tabsObj}</ul>
        </div>
      );
    });

    return (
      <div id="TabList">
        {tabListObj}
        <div
          className="add-column"
          onClick={() => {
            this.props.onAddColumn();
          }}
        >
          <span>+ Add column</span>
        </div>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    onAddColumn: () => dispatch(addColumn())
  };
};

let mapStateToProps = state => {
  return {
    tabList: state.tab.tabList
  };
};

TabList.propTypes = {};

TabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);

export default TabList;
