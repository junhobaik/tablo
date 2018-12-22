import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./redux/reducers";

const store = createStore(Reducer);

store.subscribe(() => {
  localStorage.setItem('tablo', JSON.stringify(store.getState().tab));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
