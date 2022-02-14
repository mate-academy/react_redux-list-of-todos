import React from 'react';
import './App.scss';
import { TodosList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__sidebar">
        <TodosList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};

export default App;
