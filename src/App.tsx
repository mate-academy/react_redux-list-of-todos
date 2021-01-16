import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { currentTodos, updateTodo, updateUserId, selectedUserId, todosFromServer } from './store';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  const currentTodo = useSelector(currentTodos);
  const selectedUserIds = useSelector(selectedUserId);

  useEffect(() => {
    todosFromServer();
  }, []);

  return (
    <div className="App">

      <div className="App__sidebar">
        <TodoList
          currentTodos={currentTodo}
          updateUserId={updateUserId}
          updateTodos={updateTodo}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserIds ? (
            <CurrentUser
              userId={selectedUserIds}
              updateUserId={updateUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>

    </div>
  );
};

export default App;
