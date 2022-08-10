import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import './general.scss';
import { store } from './store';
import { App } from './App';
import '@fortawesome/fontawesome-free/css/all.css';

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
