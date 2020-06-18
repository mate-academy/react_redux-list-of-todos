
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import * as api from './helpers/api';
import TodoList from './components/TodoList';
import SortButtons from './components/SortButtons';

import {
  initTodos,
  startLoading,
  finishLoading,
  getLoading,
  getTodos,
} from './store';

const getAppData = async (): Promise<Todo[]> => {
  const todosFromServer = await api.getTodos();
  const users = await api.getUsers();

  return todosFromServer.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
};

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(getLoading);

  const initData = () => {
    dispatch(startLoading());

    getAppData()
      .then(todosFromServer => {
        dispatch(initTodos(todosFromServer));
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };

  return (
    <div className="App">
      <h1 className="header">
        Redux list of todos
      </h1>
      {todos.length === 0
      && (
        <button
          type="button"
          disabled={loading}
          onClick={initData}
          className="button_load btn btn-secondary"
        >
          {loading ? 'Loading...' : 'Init data'}
        </button>
      )}

      {todos.length > 0 && (
        <>
          <SortButtons />
          <TodoList />
        </>
      )}
    </div>
  );
};

export default App;
