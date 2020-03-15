import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { TodoList } from './components/TodoList/TodoList';

import './App.css';

export const App: FC = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);
