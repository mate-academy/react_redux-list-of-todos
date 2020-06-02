import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { getTODOs, getUsers } from './API';
import TodoList from './TodoList';
import {
  isLoading, getMessage, startLoading, finishLoading, setSortField, getVisibleTodos,
} from './store';
import * as constants from './store';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';
  const todos = useSelector(getVisibleTodos);

  const getTodosFromServer = async () => {
    const [todosFromServer, usersFromServer] = await Promise.all(
      [getTODOs(), getUsers()],
    );

    const preparedTodos = todosFromServer.map((todo: TodoProps) => ({
      ...todo,
      user: usersFromServer.find((user: UserProps) => user.id === todo.userId),
    }));

    return preparedTodos;
  };

  const loadGoods = () => {
    dispatch(startLoading());

    getTodosFromServer()
      .then((data) => dispatch(finishLoading('Load Sucsess!', data)))
      .catch(() => dispatch(finishLoading('Load Error')));
  };

  return (
    <div className="App">
      <h1 className="display-5">Redux list of todos</h1>
      <h2>{loading ? <div className="spinner-border text-primary" role="status" /> : message}</h2>
      <div className="buttons">
        {todos.length === 0
          ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={loadGoods}
            >
              Load ToDos
            </button>
          )
          : (
            <>
              <button
                className="btn btn-outline-primary mr"
                type="button"
                onClick={() => dispatch(setSortField(constants.BY_TITLE))}
              >
                Sort by Title
              </button>

              <button
                className="btn btn-outline-success mr"
                type="button"
                onClick={() => dispatch(setSortField(constants.BY_COMPLETED))}
              >
                Sort by Status
              </button>

              <button
                className="btn btn-outline-info"
                type="button"
                onClick={() => dispatch(setSortField(constants.BY_NAME))}
              >
                Sort by Name
              </button>
            </>
          )}
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
