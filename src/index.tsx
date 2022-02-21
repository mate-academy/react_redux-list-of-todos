import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import App from './App';

// Just a convenient component with all the wrappers for the `App`
// The Router component (if you use it) should be placed inside the Provider
const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
