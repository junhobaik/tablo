import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addColumn,
  addRow,
  removeRow,
  setDragStatus
} from "../../redux/actions";
import "./index.scss";

class TabList extends Component {
  constructor(props) {
    super(props);
    this.drop = this.drop.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
  }
  dragStart(event) {
    const dragCol = parseInt(event.target.attributes.col.value);
    const dragRow = parseInt(event.target.attributes.row.value);

    console.log("dargStart", event.target, dragCol, dragRow);

    this.props.onSetDragStatus(
      dragCol,
      dragRow,
      this.props.tabList[dragCol].tabs[dragRow]
    );
  }
  drop(event) {
    const dropCol = parseInt(event.target.attributes.col.value);
    const dropRow = parseInt(event.target.attributes.row.value);

    console.log("drop", event.target, dropCol, dropRow);

    this.props.onAddRow(dropCol, dropRow);
    this.props.onRemoveRow();
  }
  dragEnd(event) {
    // console.log("dragEnd", event.target, event.target.attributes);
  }
  dragOver(event) {
    // console.log("onDragOver", event.target);
    event.preventDefault();
  }

  render() {
    const tabListObj = this.props.tabList.map((v, i) => {
      const colData = {
        title: v.title,
        num: i,
        tabs: v.tabs
      };
      const tabsObj = colData.tabs.map((tab, i) => {
        const data = {
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl
        };
        return (
          <div className="link-wrap" key={"link-" + i}>
            <li
              className="link"
              draggable="true"
              col={colData.num}
              row={i}
              onDragStart={this.dragStart}
              onDragEnd={this.dragEnd}
            >
              <div className="favicon">
                {data.favIconUrl ? (
                  <img src={data.favIconUrl} alt="favicon" />
                ) : null}
              </div>
              <a href={data.url} target="_blank">
                {data.title}
              </a>
            </li>
            <div
              id={`SPACE_${i}`}
              className="space"
              onDragOver={this.dragOver}
              col={colData.num}
              row={i + 1}
            >{`col=${colData.num}, row=${i + 1}`}</div>
          </div>
        );
      }, this);
      return (
        <div className="tab" key={`tab-${i}`}>
          <div className="top">
            <h2>{v.title}</h2>
            <div>*</div>
          </div>
          <ul className="tab-list" onDrop={this.drop} data={colData}>
            <div className="link-wrap" col={colData.num} row={0}>
              <div
                id={`SPACE_${i}`}
                col={colData.num}
                row={0}
                className="space"
                onDragOver={this.dragOver}
              >{`col=${colData.num}, row=0`}</div>
            </div>
            {tabsObj}
          </ul>
        </div>
      );
    }, this);

    return (
      <div id="TabList">
        {tabListObj}
        <div className="add-column-wrap">
          <div
            className="add-column"
            onClick={() => {
              this.props.onAddColumn();
            }}
          >
            <p>+ Add column</p>
          </div>
        </div>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    onAddColumn: () => dispatch(addColumn()),
    onAddRow: (col, row) => dispatch(addRow(col, row)),
    onRemoveRow: () => dispatch(removeRow()),
    onSetDragStatus: (col, row, item) => dispatch(setDragStatus(col, row, item))
  };
};

let mapStateToProps = state => {
  return {
    msg: state.msg,
    tabList: state.tab.tabList
  };
};

TabList.propTypes = {};

TabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);

export default TabList;
