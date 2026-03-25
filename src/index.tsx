import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
