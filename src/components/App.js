import React, { Component } from "react";
import "./App.scss";
import CurrentTabList from "./CurrentTabList";
import TabList from "./TabList";

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
