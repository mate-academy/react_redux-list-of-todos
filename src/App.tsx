import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Filters } from './components/Filters';

const App:React.FC = () => {
  return (
    <div className="App">
      <div className="App__sidebar">
        <h2>Todos:</h2>
        <Filters />
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
