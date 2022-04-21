import React from 'react';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import './App.scss';

export const App: React.FC = React.memo(() => {
  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          <CurrentUser />
        </div>
      </div>
    </div>
  );
});
