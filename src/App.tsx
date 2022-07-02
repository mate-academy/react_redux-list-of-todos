import React from 'react';
import './App.scss';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import './components/styles/general.scss';

const App: React.FC = () => (
  <div className="App">
    <div className="App__sidebar">
      <TodoList />
    </div>

    <div className="App__content">
      <div className="App__content-container" />
      <CurrentUser />
    </div>
  </div>
);

export default App;
