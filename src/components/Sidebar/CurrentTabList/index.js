import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { setDragStatus } from '../../../redux/actions';

class CurrentTabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.getAllTabs();

    // eslint-disable-next-line no-undef
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (changeInfo.status === 'complete') this.getAllTabs();
    });

    // eslint-disable-next-line no-undef
    chrome.tabs.onRemoved.addListener(() => {
      this.getAllTabs();
    });
  }

  getAllTabs() {
    // eslint-disable-next-line no-undef
    chrome.windows.getAll({ populate: true }, windows => {
      const list = [];
      for (const window of windows) {
        for (const tab of window.tabs) {
          const { title, url, favIconUrl } = tab;
          if (url !== 'chrome://newtab/') list.push({ title, url, favIconUrl });
        }
      }
      this.setState({
        list,
      });
    });
  }

  linkDragStart = e => {
    const { list } = this.state;
    const { onSetDragStatus } = this.props;

    const row = parseInt(e.target.attributes.row.value, 10);

    onSetDragStatus('link', null, null, list[row]);
  };

  render() {
    const { list } = this.state;

    const linkList = (list || []).map((v, i) => {
      return (
        <li
          className="link"
          key={`link-${i}`}
          draggable="true"
          onDragStart={this.linkDragStart}
          row={i}
        >
          <a
            href={v.url}
            target="_blank"
            draggable="false"
            rel="noopener noreferrer"
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

            <span className="link-title">{v.title}</span>
          </a>
        </li>
      );
    });

    return (
      <div id="CurrentTabList">
        <div className="link-list-title">
          <Fa icon="grip-horizontal" />
          <h2>Current Tabs</h2>
        </div>

        <div className="link-list">
          <ul className="list">{linkList}</ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetDragStatus: (dragEl, col, row, item) =>
      dispatch(setDragStatus(dragEl, col, row, item)),
  };
};

CurrentTabList.propTypes = {
  onSetDragStatus: PropTypes.func.isRequired,
};

CurrentTabList = connect(
  null,
  mapDispatchToProps
)(CurrentTabList);

export default CurrentTabList;
