import React, { Component } from 'react';
import CurrentTabList from './CurrentTabList';
import LinkCart from './LinkCart';
import './index.scss';

class Sidebar extends Component {
  render() {
    return (
      <div id="Sidebar">
        <CurrentTabList />
        <LinkCart />
      </div>
    );
  }
}
export default Sidebar;
