import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrentTabList from './CurrentTabList';
import LinkCart from './LinkCart';
import './index.scss';

class index extends Component {
  render() {
    return (
      <div id="Sidebar">
        <CurrentTabList />
        <LinkCart />
      </div>
    );
  }
}

index.propTypes = {};

export default index;
