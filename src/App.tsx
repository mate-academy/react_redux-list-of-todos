import React from 'react';

import { TodoList } from './components/TodoList';

import { CurrentUser } from './components/CurrentUser';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <div className="main">
        <div className="leftside">
          <TodoList />
        </div>
        <div className="rightside">
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};

export default App;
