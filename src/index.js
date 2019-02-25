import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import createReducer from './redux/reducers';
import App from './components/App';

const store = createStore(createReducer());

store.subscribe(() => {
  localStorage.setItem('tablo_tab', JSON.stringify(store.getState().tab));

  // eslint-disable-next-line no-undef
  chrome.storage.sync.set(
    {
      tablo_tab: store.getState().tab,
    },
    () => {}
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
