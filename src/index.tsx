import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import rootStore from './store';
import App from './App';

import './App.scss';
import './styles/general.scss';

const Root = () => (
  <Provider store={rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
