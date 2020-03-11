import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Todos } from './Todos';

import './App.css';

export const App: FC = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);
