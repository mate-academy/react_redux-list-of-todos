import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

// Just a convenient component with all the wrappers for the `App`
// The Router component (if you use it) should be placed inside the Provider
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(<Root />);
