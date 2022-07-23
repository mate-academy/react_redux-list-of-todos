import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux';

// Just a convenient component with all the wrappers for the `App`
// The Router component (if you use it) should be placed inside the Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
