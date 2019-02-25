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
  faCog,
);
class App extends Component {
  componentDidMount() {
    const { onLoadTabs } = this.props;
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get('tablo_tab', items => {
      onLoadTabs(items.tablo_tab);
    });
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
  mapDispatchToProps,
)(App);

export default App;
