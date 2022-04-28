import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { setupStore } from './store';
import App from './App';

const store = setupStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
