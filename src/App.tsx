import React, { FC } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Todos } from './Todos/Todos';
import { store } from './Store/Store';


export const App: FC = () => {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  );
};
