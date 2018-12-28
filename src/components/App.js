import React, { Component } from "react";
import "./App.scss";
import CurrentTabList from "./CurrentTabList";
import TabList from "./TabList";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faEllipsisV, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faEllipsisH, faEllipsisV, faTrashAlt, faEdit)

class App extends Component {
  render() {
    return (
      <div id="App">
        <TabList />
        <CurrentTabList />
      </div>
    );
  }
}

export default App;
