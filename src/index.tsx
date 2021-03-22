import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Just a convenient component with all the wrappers for the `App`
// The Router component (if you use it) should be placed inside the Provider
const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
