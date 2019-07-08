/* eslint-disable no-alert */
/* eslint-disable no-undef */
import './App.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEllipsisH,
  faEllipsisV,
  faTrashAlt,
  faEdit,
  faMinusCircle,
  faWindowRestore,
  faShoppingCart,
  faGripHorizontal,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

import { loadTabs } from '../redux/actions';
import Sidebar from './Sidebar';
import TabList from './TabList';

library.add(
  faEllipsisH,
  faEllipsisV,
  faTrashAlt,
  faEdit,
  faMinusCircle,
  faWindowRestore,
  faShoppingCart,
  faGripHorizontal,
  faCog
);
class App extends Component {
  componentDidMount() {
    const { onLoadTabs } = this.props;

    chrome.storage.sync.get('tablo_tab', items => {
      onLoadTabs(items.tablo_tab);
    });

    /** Update Alert */
    chrome.storage.sync.get('tablo_app', items => {
      const app = items.tablo_app;

      fetch('../manifest.json')
        .then(res => res.json())
        .then(json => {
          if (app === undefined) {
            chrome.storage.sync.set(
              {
                tablo_app: {
                  openLink: {
                    link: '_blank',
                    tab: '_blank',
                  },
                  scroll: {
                    xScrollSpeed: 30,
                  },
                  version: json.version,
                },
              },
              () => {
                // first use
                alert(`[Update ${json.version}] ${json.update_alert}`);
              }
            );
          } else if (app.version !== json.version) {
            chrome.storage.sync.set(
              {
                tablo_app: {
                  ...app,
                  version: json.version,
                },
              },
              () => {
                // update
                alert(`[Update ${json.version}] ${json.update_alert}`);
              }
            );
          }
        });
    });
    /** END - Update Alert */
  }

  render() {
    return (
      <div id="App">
        <TabList />
        <Sidebar />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadTabs: state => dispatch(loadTabs(state)),
});

App.propTypes = {
  onLoadTabs: PropTypes.func.isRequired,
};

App = connect(
  null,
  mapDispatchToProps
)(App);

export default App;
