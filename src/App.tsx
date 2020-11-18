import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import Start from './components/Start';
import { Finish } from './components/Finish';
import { TodoList } from './components/TodoList/';
import { CurrentUser } from './components/CurrentUser/';

import { isLoading, getMessage, loadTodos, allTodos, currentUser } from './store';
import { todosFromServer } from './api/api';

const App = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';

  const todos = useSelector(allTodos);
  const user = useSelector(currentUser);

  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(loadTodos(todosFromServer));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : message}</h2>

      <button
        className="button"
        type="button"
        onClick={getTodos}
      >
        Start
      </button>

      <Start title="Start loading" />
      <Finish title="Succeed loading" message="Loaded successfully!" />
      <Finish title="Fail loading" message="An error occurred when loading data." />

      <div className="App__container">
        <div className="App__sidebar">
          <div className="TodoList">
            <TodoList todos={todos} />
          </div>
        </div>
        <div className="App__content">
          {user
            ? (<CurrentUser user={user} />)
            : ('No user selected')
          }
        </div>
      </div>
    </div>
  );
};

export default App;
