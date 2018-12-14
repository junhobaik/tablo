import React, { Component } from "react";
import "./App.scss";
import CurrentTabList from "./CurrentTabList";

class App extends Component {
  render() {
    return (
      <div id="App">
        <CurrentTabList />
      </div>
    );
  }
}

export default App;
