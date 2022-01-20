import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducer/rootReducer';
import App from './App';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk)),
);

// Just a convenient component with all the wrappers for the `App`
// The Router component (if you use it) should be placed inside the Provider
const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById('root'));
