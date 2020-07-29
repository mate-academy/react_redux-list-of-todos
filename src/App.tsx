import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import TodoList from './components/TodoList';
import ButtonsType from './components/ButtonsType';
import * as api from './api/api';

import {
  loadTodos,
  startLoading,
  finishLoading,
  getLoading,
  getTodos,
} from './store';

const getData = async (): Promise<Todo[]> => {
  const todosFromServer = await api.loadTodos();
  const usersFromserver = await api.loadUsers();

  return todosFromServer.map(todo => ({
    ...todo,
    user: usersFromserver.find(user => user.id === todo.userId) as User,
  }));
};

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(getLoading);

  const setData = () => {
    dispatch(startLoading());

    getData()
      .then(todosFromServer => {
        dispatch(loadTodos(todosFromServer));
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };

  return (
    <div>
      <h1>
        Redux list of todos
        {todos.length}
      </h1>
      {todos.length === 0
      && (
        <button
          type="button"
          disabled={loading}
          onClick={setData}
          className="btn btn-dark"
        >
          {loading ? 'Loading...' : 'Load'}
        </button>
      )}

      {todos.length > 0
      && (
        <>
          <ButtonsType />
          <TodoList />
        </>
      )}
    </div>
  );
};

export default App;
