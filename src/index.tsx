import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import App from './App';

// Just a convenient component with all the wrappers for the `App`
// The Router component (if you use it) should be placed inside the Provider
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
