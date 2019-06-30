import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
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
import 'jquery-mousewheel';

class TabList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editValue: '',
      settingCol: null,
      settingRow: null,
      openLink: {
        link: null,
        tab: null,
      },
    };
  }

  componentDidMount() {
    const setState = (key, data) => {
      this.setState({
        [key]: data,
      });
    };

    // eslint-disable-next-line no-undef
    chrome.storage.sync.get('tablo_app', items => {
      if (items.tablo_app) {
        setState('openLink', items.tablo_app.openLink);
      }
    });
  }

  allDragOver = e => {
    e.preventDefault();
  };

  linkDragStart = e => {
    e.stopPropagation();
    const dragCol = parseInt(e.target.attributes.col.value, 10);
    const dragRow = parseInt(e.target.attributes.row.value, 10);
    const { onSetDragStatus, tabList } = this.props;
    onSetDragStatus('link', dragCol, dragRow, tabList[dragCol].tabs[dragRow]);
  };

  linkDragEnd = () => {
    const { onClearDragStatus } = this.props;
    onClearDragStatus();
  };

  spaceDrop = e => {
    const { dragStatus } = this.props;

    if (dragStatus.dragEl === 'link') {
      const {
        onAddRow,
        onClearDragStatus,
        onRemoveRow,
        onMoveInsideRow,
      } = this.props;
      const { target } = e;
      const dropCol = parseInt(target.attributes.col.value, 10);
      const dropRow = parseInt(target.attributes.row.value, 10);

      target.classList.remove('space-drag-hover');

      onAddRow(dropCol, dropRow);

      // Sidebar에서 드래그했을때
      if (dragStatus.dragCol !== null) {
        if (dragStatus.dragCol === dropCol) {
          onMoveInsideRow(dropRow);
        } else {
          onRemoveRow();
        }
      }

      onClearDragStatus();
    }
  };

  spaceDragEnter = e => {
    const { dragStatus } = this.props;
    if (dragStatus.dragEl === 'link')
      e.target.classList.add('space-drag-hover');
  };

  spaceDragLeave = e => {
    e.target.classList.remove('space-drag-hover');
  };

  tabDragStart = e => {
    const dragCol = parseInt(e.target.attributes.col.value, 10);
    const { onSetDragStatus, tabList } = this.props;
    onSetDragStatus('tab', dragCol, null, tabList[dragCol]);
  };

  tabDragEnd = () => {
    const { onClearDragStatus } = this.props;
    onClearDragStatus();
  };

  spaceTabDrop = e => {
    const { dragStatus } = this.props;
    if (dragStatus.dragEl === 'tab') {
      const { onMoveCol, onClearDragStatus } = this.props;
      const { target } = e;
      const dropCol = parseInt(target.attributes.col.value, 10);

      target.classList.remove('space-tab-drag-hover');

      onMoveCol(dropCol);
      onClearDragStatus();
    }
  };

  spaceTabDragEnter = e => {
    const { dragStatus } = this.props;

    if (dragStatus.dragEl === 'tab')
      e.target.classList.add('space-tab-drag-hover');
  };

  spaceTabDragLeave = e => {
    e.target.classList.remove('space-tab-drag-hover');
  };

  settingMouseEnter = e => {
    const { target } = e;
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
    const { target } = e;
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
    const { key, target } = e;

    if (key === 'Enter') {
      target.style.display = 'none';
    }
  };

  blurEditTitles = e => {
    const edit = document.querySelectorAll('.edit');
    const title = document.querySelectorAll('.title');

    for (const v of edit) {
      v.style.display = 'none';
    }
    for (const v of title) {
      v.style.display = 'inline';
    }

    const { editValue } = this.state;
    const { onSubmitEditTitle, onSubmitEditTabTitle } = this.props;

    if (e.target.classList.contains('title-edit')) {
      onSubmitEditTitle(editValue);
    } else {
      onSubmitEditTabTitle(editValue);
    }

    this.setState({
      editValue: '',
    });
  };

  focusEditTitle = e => {
    this.setState({
      editValue: e.target.parentNode.querySelector('.title').innerHTML,
    });
  };

  openLinksClick = e => {
    const { tabList } = this.props;
    const { tabs, openLink } = tabList[
      parseInt(
        e.target.parentNode.parentNode.parentNode.attributes.col.value,
        10
      )
    ];
    const links = [];
    for (const v of tabs) {
      links.push(v.url);
    }

    if (openLink.tab === '_self') {
      for (const v of links) {
        // eslint-disable-next-line no-undef
        chrome.tabs.create({ url: v });
      }
    } else {
      // eslint-disable-next-line no-undef
      chrome.windows.create({ url: links, type: 'normal' });
    }
  };

  render() {
    const { tabList, onAddColumn } = this.props;

    const mapTabList = tabList.map((v, i) => {
      const { editValue } = this.state;
      const colData = {
        title: v.title,
        num: i,
        tabs: v.tabs,
      };

      const linkList = colData.tabs.map((tab, j) => {
        const { openLink, settingCol, settingRow } = this.state;
        const data = {
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl,
        };

        return (
          <div className="link-container" key={`link-container-${j}`}>
            <li
              className="link"
              col={colData.num}
              row={j}
              draggable={editValue === '' ? 'true' : 'false'}
              onDragStart={this.linkDragStart}
              onDragEnd={this.linkDragEnd}
            >
              <a
                href={data.url}
                target={openLink.link === '_self' ? '_self' : '_blank'}
                draggable="false"
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

                <span className="title-text title">{data.title}</span>

                <textarea
                  className="title-edit edit"
                  type="text"
                  value={editValue}
                  onClick={e => {
                    e.preventDefault();
                  }}
                  onChange={this.handleEditValue}
                  placeholder="After editing, press Enter."
                  onKeyPress={this.submitEditTitle}
                  onBlur={this.blurEditTitles}
                  onFocus={this.focusEditTitle}
                />
              </a>

              <div
                className="link-setting setting-icon"
                onMouseEnter={this.settingMouseEnter}
                onMouseLeave={this.settingMouseLeave}
              >
                <Fa className="no-event" icon="ellipsis-h" />
                <Setting col={settingCol} row={settingRow} />
              </div>
            </li>

            <div
              className="space"
              col={colData.num}
              row={j + 1}
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
            draggable={editValue === '' ? 'true' : 'false'}
            onDragStart={this.tabDragStart}
            onDragEnd={this.tabDragEnd}
          >
            <div className="tab-inner-wrap">
              <div className="tab-header">
                <h2 className="tab-title title">{v.title}</h2>

                <input
                  className="tab-title-edit edit"
                  type="text"
                  value={editValue}
                  onClick={e => {
                    e.preventDefault();
                  }}
                  onChange={this.handleEditValue}
                  placeholder="After editing, press Enter."
                  onKeyPress={this.submitEditTitle}
                  onBlur={this.blurEditTitles}
                  onFocus={this.focusEditTitle}
                />

                <div className="tab-side">
                  <div
                    className="open-links"
                    onClick={this.openLinksClick}
                    role="presentation"
                  >
                    <Fa className="no-event" icon="window-restore" />
                  </div>

                  <div
                    className="tab-setting setting-icon"
                    onMouseEnter={this.settingMouseEnter}
                    onMouseLeave={this.settingMouseLeave}
                  >
                    <Fa className="no-event" icon="ellipsis-v" />
                    <Setting col={colData.num} />
                  </div>
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
        {mapTabList}
        <div className="add-column-wrap">
          <div
            className="add-column"
            onClick={() => {
              onAddColumn();
            }}
            role="presentation"
          >
            <p>+ Add column</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
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

const mapStateToProps = state => {
  return {
    dragStatus: state.tab.dragStatus,
    tabList: state.tab.tabList,
  };
};

TabList.propTypes = {
  dragStatus: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tabList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onAddColumn: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onMoveInsideRow: PropTypes.func.isRequired,
  onSetDragStatus: PropTypes.func.isRequired,
  onClearDragStatus: PropTypes.func.isRequired,
  onSubmitEditTitle: PropTypes.func.isRequired,
  onSubmitEditTabTitle: PropTypes.func.isRequired,
  onMoveCol: PropTypes.func.isRequired,
};

TabList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);

export default TabList;
