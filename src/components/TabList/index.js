import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addColumn,
  addRow,
  removeRow,
  setDragStatus,
  clearDragStatus
} from "../../redux/actions";
import "./index.scss";

class TabList extends Component {
  constructor(props) {
    super(props);
    this.dragOver = this.dragOver.bind(this);
    this.linkDragStart = this.linkDragStart.bind(this);
    this.linkDragEnd = this.linkDragEnd.bind(this);
    this.spaceDragEnter = this.spaceDragEnter.bind(this);
    this.spaceDragLeave = this.spaceDragLeave.bind(this);
    this.spaceDrop = this.spaceDrop.bind(this);
  }
  dragOver(e) {
    e.preventDefault();
  }
  linkDragStart(e) {
    console.log("linkDragStart()", e.target);

    const dragCol = parseInt(e.target.attributes.col.value);
    const dragRow = parseInt(e.target.attributes.row.value);

    this.props.onSetDragStatus(
      dragCol,
      dragRow,
      this.props.tabList[dragCol].tabs[dragRow]
    );
  }
  linkDragEnd(e) {
    console.log("linkDragEnd()", e.target);
    this.props.onClearDragStatus();
  }
  spaceDrop(e) {
    const dropCol = parseInt(e.target.attributes.col.value);
    const dropRow = parseInt(e.target.attributes.row.value);

    console.log("spaceDrop()", e.target, dropCol, dropRow);

    e.target.classList.remove("drag-hover");

    this.props.onAddRow(dropCol, dropRow);
    if (this.props.dragStatus.dragCol !== null) this.props.onRemoveRow();
    this.props.onClearDragStatus();
  }
  spaceDragEnter(e) {
    console.log("spaceDragEnter", e.target);
    e.target.classList.add("drag-hover");
  }
  spaceDragLeave(e) {
    console.log("spaceDragLeave", e.target);
    e.target.classList.remove("drag-hover");
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
          <div className="link-list-inner" key={"link-" + i}>
            <li
              className="link"
              col={colData.num}
              row={i}
              draggable="true"
              onDragStart={this.linkDragStart}
              onDragEnd={this.linkDragEnd}
            >
              <div className="favicon">
                {data.favIconUrl ? (
                  <img src={data.favIconUrl} alt="favicon" />
                ) : (
                  <div className="noFavIcon">
                    <span>{data.title[0]}</span>
                  </div>
                )}
              </div>
              <a href={data.url} target="_blank" draggable="false">
                <span className="title-text">{data.title}</span>
              </a>
            </li>
            <div
              className="space"
              col={colData.num}
              row={i + 1}
              onDrop={this.spaceDrop}
              onDragOver={this.dragOver}
              onDragEnter={this.spaceDragEnter}
              onDragLeave={this.spaceDragLeave}
            />
          </div>
        );
      }, this);

      return (
        <div className="tab" key={`tab-${i}`}>
          <div className="tab-header">
            <h2 className="tab-title">{v.title}</h2>
            <div className="tab-setting">*</div>
          </div>
          <ul
            className="link-list"
            //  onDrop={this.linkListDrop}
          >
            <div className="link-list-inner" col={colData.num} row={0}>
              <div
                className="space"
                col={colData.num}
                row={0}
                onDrop={this.spaceDrop}
                onDragOver={this.dragOver}
                onDragEnter={this.spaceDragEnter}
                onDragLeave={this.spaceDragLeave}
              />
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
    onSetDragStatus: (col, row, item) =>
      dispatch(setDragStatus(col, row, item)),
    onClearDragStatus: () => dispatch(clearDragStatus())
  };
};

let mapStateToProps = state => {
  return {
    dragStatus: state.tab.dragStatus,
    tabList: state.tab.tabList
  };
};

TabList.propTypes = {};

TabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);

export default TabList;
