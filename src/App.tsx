import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoList />
      <CurrentUser />
    </div>
  );
};

export default App;
