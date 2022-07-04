import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const changeUserId = (todo: Todo) => (
    setSelectedUserId(todo.userId)
  );

  const clear = () => (
    setSelectedUserId(0)
  );

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList userId={changeUserId} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} clear={clear} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
