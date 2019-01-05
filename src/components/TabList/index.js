import React, { Component } from 'react';
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
  moveInsideRow,
  moveCol,
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

  allDragOver = e => {
    e.preventDefault();
  };

  linkDragStart = e => {
    e.stopPropagation();
    const dragCol = parseInt(e.target.attributes.col.value);
    const dragRow = parseInt(e.target.attributes.row.value);

    this.props.onSetDragStatus(
      'link',
      dragCol,
      dragRow,
      this.props.tabList[dragCol].tabs[dragRow]
    );
  };

  linkDragEnd = e => {
    this.props.onClearDragStatus();
  };

  spaceDrop = e => {
    if (this.props.dragStatus.dragEl === 'link') {
      const target = e.target;
      const dropCol = parseInt(target.attributes.col.value);
      const dropRow = parseInt(target.attributes.row.value);

      target.classList.remove('space-drag-hover');

      this.props.onAddRow(dropCol, dropRow);

      // Sidebar에서 드래그했을때
      if (this.props.dragStatus.dragCol !== null) {
        if (this.props.dragStatus.dragCol === dropCol) {
          this.props.onMoveInsideRow(dropRow);
        } else {
          this.props.onRemoveRow();
        }
      }

      this.props.onClearDragStatus();
    }
  };

  spaceDragEnter = e => {
    if (this.props.dragStatus.dragEl === 'link')
      e.target.classList.add('space-drag-hover');
  };

  spaceDragLeave = e => {
    e.target.classList.remove('space-drag-hover');
  };

  tabDragStart = e => {
    const dragCol = parseInt(e.target.attributes.col.value);

    this.props.onSetDragStatus(
      'tab',
      dragCol,
      null,
      this.props.tabList[dragCol]
    );
  };

  tabDragEnd = e => {
    this.props.onClearDragStatus();
  };

  spaceTabDrop = e => {
    if (this.props.dragStatus.dragEl === 'tab') {
      const target = e.target;
      const dropCol = parseInt(target.attributes.col.value);

      target.classList.remove('space-tab-drag-hover');

      this.props.onMoveCol(dropCol);

      this.props.onClearDragStatus();
    }
  };

  spaceTabDragEnter = e => {
    if (this.props.dragStatus.dragEl === 'tab')
      e.target.classList.add('space-tab-drag-hover');
  };

  spaceTabDragLeave = e => {
    e.target.classList.remove('space-tab-drag-hover');
  };

  settingMouseEnter = e => {
    const target = e.target;
    if (target.classList.contains('setting-icon'))
      target.querySelector('.setting-component').style.display = 'inline';

    if (target.parentNode.attributes.col) {
      this.setState({
        settingCol: target.parentNode.attributes.col.value,
        settingRow: target.parentNode.attributes.row.value,
      });
    }
  };

  settingMouseLeave = e => {
    const target = e.target;
    if (target.querySelector('.setting-component')) {
      target.querySelector('.setting-component').style.display = 'none';
    } else {
      target.parentNode.parentNode.querySelector(
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
    const target = e.target;

    if (e.key === 'Enter') {
      this.props.onSubmitEditTitle(this.state.editValue);
      this.setState({
        editValue: '',
      });
      target.style.display = 'none';
      target.parentNode.querySelector('a>.title-text').style.display = 'inline';
    }
  };

  submitEditTabTitle = e => {
    const { key, target } = e;

    if (key === 'Enter') {
      this.props.onSubmitEditTabTitle(this.state.editValue);
      this.setState({
        editValue: '',
      });
      target.style.display = 'none';
      target.parentNode.querySelector('.tab-title').style.display = 'inline';
    }
  };

  blurEditTitles = e => {
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
    const tabList = this.props.tabList.map((v, i) => {
      const colData = {
        title: v.title,
        num: i,
        tabs: v.tabs,
      };

      const linkList = colData.tabs.map((tab, i) => {
        const data = {
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl,
        };

        return (
          <div className="link-container" key={'link-' + i}>
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
                  onBlur={this.blurEditTitles}
                />
              </a>

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
              onDragOver={this.allDragOver}
              onDragEnter={this.spaceDragEnter}
              onDragLeave={this.spaceDragLeave}
            />
          </div>
        );
      }, this);

      return (
        <React.Fragment key={`tab-${i}`}>
          {i === 0 ? (
            <div
              className="space-tab"
              col="0"
              onDrop={this.spaceTabDrop}
              onDragOver={this.allDragOver}
              onDragEnter={this.spaceTabDragEnter}
              onDragLeave={this.spaceTabDragLeave}
            />
          ) : null}
          <div
            className="tab"
            col={colData.num}
            draggable="true"
            onDragStart={this.tabDragStart}
            onDragEnd={this.tabDragEnd}
          >
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
                onBlur={this.blurEditTitles}
              />

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
              <div className="link-container" col={colData.num} row={0}>
                <div
                  className="space"
                  col={colData.num}
                  row={0}
                  onDrop={this.spaceDrop}
                  onDragOver={this.allDragOver}
                  onDragEnter={this.spaceDragEnter}
                  onDragLeave={this.spaceDragLeave}
                />
              </div>
              {linkList}
            </ul>
          </div>
          <div
            className="space-tab"
            col={colData.num + 1}
            onDrop={this.spaceTabDrop}
            onDragOver={this.allDragOver}
            onDragEnter={this.spaceTabDragEnter}
            onDragLeave={this.spaceTabDragLeave}
          />
        </React.Fragment>
      );
    }, this);

    return (
      <div id="TabList">
        {tabList}
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
    onMoveInsideRow: dropRow => dispatch(moveInsideRow(dropRow)),
    onSetDragStatus: (dragEl, col, row, item) =>
      dispatch(setDragStatus(dragEl, col, row, item)),
    onClearDragStatus: () => dispatch(clearDragStatus()),
    onSubmitEditTitle: title => dispatch(submitEditTitle(title)),
    onSubmitEditTabTitle: title => dispatch(submitEditTabTitle(title)),
    onMoveCol: dropCol => dispatch(moveCol(dropCol)),
  };
};

let mapStateToProps = state => {
  return {
    dragStatus: state.tab.dragStatus,
    tabList: state.tab.tabList,
  };
};

TabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);

export default TabList;
