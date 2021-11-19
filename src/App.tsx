import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import TodoList from './components/TodoList/TodoList';
import CurrentUser from './components/CurrentUser/CurrentUser';
import { getSelectedUserId } from './store';

const App: React.FC = () => {
  const selectedUserId = useSelector(getSelectedUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
