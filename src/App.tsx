import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App: React.FC = () => (
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

export default App;
