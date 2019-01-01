import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  addColumn,
  addRow,
  removeRow,
  setDragStatus,
  clearDragStatus,
  submitEditTitle,
  submitEditTabTitle,
} from '../../redux/actions';
import './index.scss';
import Setting from './Setting';

class TabList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editValue: '',
      settingCol: null,
      settingRow: null,
    };
  }

  dragOver = e => {
    e.preventDefault();
  };

  linkDragStart = e => {
    const dragCol = parseInt(e.target.attributes.col.value);
    const dragRow = parseInt(e.target.attributes.row.value);

    this.props.onSetDragStatus(
      dragCol,
      dragRow,
      this.props.tabList[dragCol].tabs[dragRow]
    );
  };

  linkDragEnd = e => {
    this.props.onClearDragStatus();
  };

  spaceDrop = e => {
    const dropCol = parseInt(e.target.attributes.col.value);
    const dropRow = parseInt(e.target.attributes.row.value);

    e.target.classList.remove('drag-hover');

    this.props.onAddRow(dropCol, dropRow);
    if (this.props.dragStatus.dragCol !== null) this.props.onRemoveRow();
    this.props.onClearDragStatus();
  };

  spaceDragEnter = e => {
    e.target.classList.add('drag-hover');
  };

  spaceDragLeave = e => {
    e.target.classList.remove('drag-hover');
  };

  settingMouseEnter = e => {
    if (e.target.classList.contains('setting-icon'))
      e.target.querySelector('.setting-component').style.display = 'inline';

    if (e.target.parentNode.attributes.col) {
      this.setState({
        settingCol: e.target.parentNode.attributes.col.value,
        settingRow: e.target.parentNode.attributes.row.value,
      });
    }
  };
  settingMouseLeave = e => {
    if (e.target.querySelector('.setting-component')) {
      e.target.querySelector('.setting-component').style.display = 'none';
    } else {
      e.target.parentNode.parentNode.querySelector(
        '.setting-component'
      ).style.display = 'none';
    }
    this.setState({
      settingCol: null,
      settingRow: null,
    });
  };
  handleEditValue = e => {
    this.setState({
      editValue: e.target.value,
    });
  };
  submitEditTitle = e => {
    if (e.key === 'Enter') {
      this.props.onSubmitEditTitle(this.state.editValue);
      this.setState({
        editValue: '',
      });
      e.target.style.display = 'none';
      e.target.parentNode.querySelector('a>.title-text').style.display =
        'inline';
    }
  };
  submitEditTabTitle = e => {
    if (e.key === 'Enter') {
      this.props.onSubmitEditTabTitle(this.state.editValue);
      this.setState({
        editValue: '',
      });
      e.target.style.display = 'none';
      e.target.parentNode.querySelector('.tab-title').style.display = 'inline';
    }
  };

  blurEditTitle = e => {
    const edit = document.querySelectorAll('.edit');
    const title = document.querySelectorAll('.title');

    for (let v of edit) {
      v.style.display = 'none';
    }
    for (let v of title) {
      v.style.display = 'inline';
    }

    this.setState({
      editValue: '',
    });
  };

  render() {
    const tabListObj = this.props.tabList.map((v, i) => {
      const colData = {
        title: v.title,
        num: i,
        tabs: v.tabs,
      };

      const tabsObj = colData.tabs.map((tab, i) => {
        const data = {
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl,
        };

        return (
          <div className="link-list-inner" key={'link-' + i}>
            <li
              className="link"
              col={colData.num}
              row={i}
              draggable="true"
              onDragStart={this.linkDragStart}
              onDragEnd={this.linkDragEnd}
            >
              <a href={data.url} target="_blank" draggable="false">
                <div className="favicon">
                  {data.favIconUrl ? (
                    <img src={data.favIconUrl} alt="favicon" />
                  ) : (
                    <div className="noFavIcon">
                      <span>{data.title[0]}</span>
                    </div>
                  )}
                </div>

                <span className="title-text title">{data.title}</span>
                <input
                  className="title-edit edit"
                  type="text"
                  value={this.state.editValue}
                  onClick={e => {
                    e.preventDefault();
                  }}
                  onChange={this.handleEditValue}
                  placeholder="After editing, press Enter."
                  onKeyPress={this.submitEditTitle}
                  onBlur={this.blurEditTitle}
                />
              </a>
              {/* setting */}
              <div
                className="link-setting setting-icon"
                onMouseEnter={this.settingMouseEnter}
                onMouseLeave={this.settingMouseLeave}
              >
                <Fa className="no-event" icon="ellipsis-h" />
                <Setting
                  col={this.state.settingCol}
                  row={this.state.settingRow}
                />
              </div>
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
            <h2 className="tab-title title">{v.title}</h2>
            <input
              className="tab-title-edit edit"
              type="text"
              value={this.state.editValue}
              onClick={e => {
                e.preventDefault();
              }}
              onChange={this.handleEditValue}
              placeholder="After editing, press Enter."
              onKeyPress={this.submitEditTabTitle}
              onBlur={this.blurEditTitle}
            />
            {/* setting */}
            <div
              className="tab-setting setting-icon"
              onMouseEnter={this.settingMouseEnter}
              onMouseLeave={this.settingMouseLeave}
            >
              <Fa className="no-event" icon="ellipsis-v" />
              <Setting col={colData.num} />
            </div>
          </div>
          <ul className="link-list">
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
    onClearDragStatus: () => dispatch(clearDragStatus()),
    onSubmitEditTitle: title => dispatch(submitEditTitle(title)),
    onSubmitEditTabTitle: title => dispatch(submitEditTabTitle(title)),
  };
};

let mapStateToProps = state => {
  return {
    dragStatus: state.tab.dragStatus,
    tabList: state.tab.tabList,
  };
};

TabList.propTypes = {};

TabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);

export default TabList;
