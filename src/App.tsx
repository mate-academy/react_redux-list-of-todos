import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { getTodos, getUsers } from './helpers/api';

import {
  startLoading,
  finishLoading,
  handleSuccess,
  handleError,
  hasError,
  isLoading,
  listOfTodos,
} from './store';
import TodoList from './components/TodoList';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const error = useSelector(hasError);
  const todos = useSelector(listOfTodos);

  const getData = () => {
    dispatch(startLoading());

    Promise.all([getTodos(), getUsers()])
      .then(([todoFromServer, usersFromServer]) => {
        const preparedTodosList = todoFromServer.map(post => {
          return {
            ...post,
            user: usersFromServer
              .find(user => user.id === post.userId),
          };
        });

        dispatch(handleSuccess(preparedTodosList as Todo[]));
      })
      .catch(() => {
        dispatch(handleError());
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };

  return (
    <div className="app">
      {todos.length === 0 && (
        <button
          type="button"
          className="app__load-button"
          onClick={getData}
        >
          {loading ? 'Loading...' : 'LOAD DATA'}
        </button>
      )}
      {error && (
        <div className="app__error">
          ERROR OCCURRED, TRY AGAIN
        </div>
      )}
      {todos.length !== 0 && (
        <TodoList todos={todos} />
      )}
    </div>
  );
};

export default App;
