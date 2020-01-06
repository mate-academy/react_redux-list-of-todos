import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppHandler from './AppHandler';

ReactDOM.render(
  <Provider store={store}>
    <AppHandler />
  </Provider>,
  document.getElementById('root')
);
