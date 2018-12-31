import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import LinkList from '../LinkList';

class index extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }
  render() {
    return (
      <div id="LinkCart">
        <LinkList title="Link Cart" list={this.state.list}/>
      </div>
    );
  }
}

index.propTypes = {};

export default index;
