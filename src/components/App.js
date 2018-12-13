import React, { Component } from "react";
import "./App.css";
import { addTab } from "../actions";
import CurrentTabList from "./CurrentTabList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: []
    };
  }

  getAllTabs() {
    chrome.windows.getAll({ populate: true }, windows => {
      let temp = [];
      for (let window of windows) {
        for (let tab of window.tabs) {
          console.log(tab);
          const { id, title, url, favIconUrl } = tab;
          temp.push({ id, title, url, favIconUrl });
        }
      }
      this.setState({
        tabs: temp
      });
    });
  }

  componentDidMount() {
    this.getAllTabs();

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete") this.getAllTabs();
    });

    chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
      this.getAllTabs();
    });
  }

  render() {
    return (
      <div id="App">
        <CurrentTabList tabs={this.state.tabs} />
      </div>
    );
  }
}

export default App;
