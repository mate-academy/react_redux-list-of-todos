import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { TProvider } from './context/Context';

import { store } from './app/store';
import { App } from './App';

// Just a convenient component with all the wrappers for the `App`
// The Router component (if you use it) should be placed inside the Provider
const Root = () => (
  <Provider store={store}>
    <TProvider>
      <Router>
        <App />
      </Router>
    </TProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
