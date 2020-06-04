import React from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  startLoading, finishLoading, setSortField, getVisibleTodos, getMessage, getIsLoading, errorLoading,
} from './store';
import * as constants from './store';

import { getUsers, getTodos } from './helpers/api';
import ListOfTodos from './components/ListOfTodos';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const readinessMessage = useSelector(getMessage) || 'Ready!';
  const todos = useSelector(getVisibleTodos);

  const getTodosFromServer = async () => {
    const [todosFromServer, usersFromServer] = await Promise.all(
      [getTodos(), getUsers()],
    );

    const preparedTodos = todosFromServer.map((todo: Todo) => ({
      ...todo,
      user: usersFromServer.find((user: User) => user.id === todo.userId),
    }));

    return preparedTodos;
  };

  const loadedData = () => {
    dispatch(startLoading());

    getTodosFromServer()
      .then((data) => dispatch(finishLoading('Data uploaded successfully!', data)))
      .catch(() => dispatch(errorLoading('Loading error')));
  };

  return (
    <div className="main">
      <h1>Redux list of TODOs</h1>
      <h2>
        {isLoading ? <div className="spinner" role="status" /> : readinessMessage}
      </h2>

      <div>
        {todos.length === 0
          ? (
            <button
              className="button"
              type="button"
              onClick={loadedData}
            >
              Load All ToDos
            </button>
          ) : (
            <>
              <div className="buttons">
                <button
                  type="button"
                  className="button"
                  onClick={() => dispatch(setSortField(constants.SORT_BY_TITLE))}
                >
                  Sort by title
                </button>

                <button
                  type="button"
                  className="button"
                  onClick={() => dispatch(setSortField(constants.SORT_BY_COMPLETED))}
                >
                  Sort by completed
                </button>

                <button
                  type="button"
                  className="button"
                  onClick={() => dispatch(setSortField(constants.SORT_BY_NAME))}
                >
                  Sort by user
                </button>
              </div>

              <ListOfTodos todos={todos} />
            </>
          )}
      </div>
    </div>
  );
};

export default App;
