import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { getTodos, getUsers } from './helpers/api';

import {
  startLoading,
  finishLoading,
  setTodos,
  handleError,
  getHasError,
  getIsLoading,
  getListOfTodos,
} from './store';
import TodoList from './components/TodoList/TodoList';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getIsLoading);
  const errorMessage = useSelector(getHasError);
  const todos = useSelector(getListOfTodos);

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

        dispatch(setTodos(preparedTodosList as Todo[]));
      })
      .catch((e) => {
        dispatch(handleError(e.message || e));
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
      {errorMessage && (
        <div className="app__error">
          {`Error: ${errorMessage}`}
        </div>
      )}
      {todos.length !== 0 && (
        <TodoList todos={todos} />
      )}
    </div>
  );
};

export default App;
