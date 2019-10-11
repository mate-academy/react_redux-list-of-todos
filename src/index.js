import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import EnhancedApp from './AppConnect';

ReactDOM.render((
  <Provider store={store}>
    <EnhancedApp />
  </Provider>
), document.getElementById('root'));
