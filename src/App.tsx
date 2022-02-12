// import React from 'react';
// import { useSelector } from 'react-redux';

import './App.scss';
import './general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
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
};

export default App;
