import React, { Component } from 'react';
import CurrentTabList from './CurrentTabList';
import LinkCart from './LinkCart';
import './index.scss';
import AppFooter from './AppFooter';

class Sidebar extends Component {
  render() {
    return (
      <div id="Sidebar">
        <CurrentTabList />
        <LinkCart />
        <AppFooter />
      </div>
    );
  }
}
export default Sidebar;
