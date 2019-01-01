import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Sidebar from "./Sidebar";
import TabList from "./TabList";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEllipsisH,
  faEllipsisV,
  faTrashAlt,
  faEdit,
  faMinusCircle,
  faWindowRestore,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faEllipsisH,
  faEllipsisV,
  faTrashAlt,
  faEdit,
  faMinusCircle,
  faWindowRestore,
  faShoppingCart
);

import { loadTabs } from "../redux/actions";

class App extends Component {
  componentDidMount() {
    const load = this.props.onLoadTabs;
    chrome.storage.sync.get("tablo_tab", function(items) {
      load(items.tablo_tab);
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
let mapDispatchToProps = dispatch => {
  return {
    onLoadTabs: state => dispatch(loadTabs(state))
  };
};

let mapStateToProps = state => {
  return {};
};

App.propTypes = {};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
