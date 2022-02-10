import React from 'react';
import './App.scss';
import { TodosList } from './components/TodosList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  // eslint-disable-next-line no-console
  console.log('app render');

  return (
    <div className="App">
      <TodosList />
      <CurrentUser />
    </div>
  );
};

export default App;
