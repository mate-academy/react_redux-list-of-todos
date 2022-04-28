import React from 'react';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';
import './styles/general.scss';
import { useAppSelector } from './hooks/hooks';

const App: React.FC = () => {
  const { selectedUserId } = useAppSelector(store => store.user);

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
