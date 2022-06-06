// import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadTodos, setTodos } from './store';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(setTodos);

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    dispatch(loadTodos(todosFromServer));
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="app">
      <div className="app__sidebar">
        <TodoList
          todos={todos}
          selectUser={selectUser}
          // selectedUserId={selectedUserId}
        />
      </div>

      <div className="app__content">
        <div className="app__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              selectUser={selectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
