import React from 'react';
import './styles/general.scss';

import './App.scss';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const { userId } = useSelector((state: Initial) => state.reducerTodos);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {userId ? (<CurrentUser />) : (<h3>Choose a User!</h3>)}
        </div>
      </div>
    </div>
  );
};

export default App;
