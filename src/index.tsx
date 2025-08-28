import { store } from './app/store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
