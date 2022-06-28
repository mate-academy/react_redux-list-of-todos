import React, { useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const deleteUser = useCallback(() => {
    setSelectedUserId(0);
  }, [selectedUserId]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectedUserId={setSelectedUserId}
          currentUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              deleteUser={deleteUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
