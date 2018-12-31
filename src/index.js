import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import createReducer from "./redux/reducers";

const store = createStore(createReducer());

store.subscribe(() => {
  console.log(store.getState())
  localStorage.setItem("tablo", JSON.stringify(store.getState().tab));

  chrome.storage.sync.set(
    {
      tablo_tab: store.getState().tab
    },
    () => {
      console.log("Save to storage, ", store.getState().tab);
    }
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
