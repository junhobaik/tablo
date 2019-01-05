import React, { Component } from 'react';
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

  linkDragStart = e => {
    const row = parseInt(e.target.attributes.row.value);
    this.props.onSetDragStatus('link', null, null, this.state.list[row]);
  };

  getAllTabs() {
    chrome.windows.getAll({ populate: true }, windows => {
      let list = [];
      for (let window of windows) {
        for (let tab of window.tabs) {
          const { title, url, favIconUrl } = tab;
          list.push({ title, url, favIconUrl });
        }
      }
      this.setState({
        list,
      });
    });
  }

  componentDidMount() {
    this.getAllTabs();

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') this.getAllTabs();
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
          key={'link-' + i}
          draggable="true"
          onDragStart={this.linkDragStart}
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
            <Fa icon="window-restore" />
            <h2>Current Tabs</h2>
          </div>
          <ul className="list">{linkList}</ul>
        </div>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    onSetDragStatus: (dragEl, col, row, item) =>
      dispatch(setDragStatus(dragEl, col, row, item)),
  };
};

CurrentTabList = connect(
  null,
  mapDispatchToProps
)(CurrentTabList);

export default CurrentTabList;
