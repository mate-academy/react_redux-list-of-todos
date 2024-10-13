import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';
import { AppContextContainer } from './context/AppContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppContextContainer>
      <Router>
        <App />
      </Router>
    </AppContextContainer>
  </Provider>,
);
