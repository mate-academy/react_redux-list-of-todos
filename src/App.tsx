import React, { FC } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Todos } from './components/Todos/Todos';
import { store } from './store/store';

const App: FC = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);

export default App;
