import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import store from './store';
import App from './App';

import 'bulma/css/bulma.css';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
