import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

import { getTodos, getUsers } from './api';
import {
  getSortedTodos,
  setTodos,
  setSortField,
  killTodo,
  setLoaded,
  finishLoading,
  startLoading,
  getMessage,
  getState,
  getStateTodos,
  getLoading,
  getLoaded,
} from './store';


const App = () => {
  const dispatch = useDispatch();
  const message = useSelector(getMessage);
  const sortedTodos = getSortedTodos(useSelector(getState));
  const todosFromState = useSelector(getStateTodos);
  const loading = useSelector(getLoading);
  const loaded = useSelector(getLoaded);

  let todoCache: any = [];

  const loadTodosFromServer = async () => {
    dispatch(startLoading());

    try {
      const todos = await getTodos();
      const users = await getUsers();

      dispatch(setTodos({ todos, users }));
      dispatch(finishLoading(message));
      dispatch(setLoaded());
    } catch (error) {
      dispatch(finishLoading(message));
    }
  };

  if (sortedTodos !== undefined && sortedTodos.length >= 1) {
    todoCache = [...sortedTodos];
  } else {
    todoCache = [...todosFromState];
  }

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>
        {loading
          ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )
          : message}
      </h2>

      {loaded
        && (
          <>
            <button
              type="button"
              onClick={() => dispatch(setSortField('title'))}
              className="btn btn-primary"
            >
              sortBytitle
            </button>

            <button
              type="button"
              onClick={() => dispatch(setSortField('name'))}
              className="btn btn-primary"
            >
              sortByname
            </button>

            <button
              type="button"
              onClick={() => dispatch(setSortField('completed'))}
              className="btn btn-primary"
            >
              sortByCompleted
            </button>
          </>
        )}

      {!loaded
        && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={loadTodosFromServer}
          >
            {loading ? 'Loading...' : 'Load'}
          </button>
        )}

      {loaded && (
        <ul>
          {todoCache.map((item: any) => (
            <div
              className={item.completed
                ? 'card text-white bg-success mb-3'
                : 'card text-white bg-danger mb-3'}
              style={{ maxWidth: '18rem' }}
            >
              <div className="card-header">
                {item.user.name}
                <button type="button" onClick={() => dispatch(killTodo(item.id))}>X</button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          ))}
        </ul>
      )}

    </div>
  );
};


export default App;
