import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import * as api from './helpers/api';
import {
  initTodos,
} from './store/todos';
import {
  startLoading, finishLoading,
} from './store/loading';
import {
  getQuery,
  getTodos,
  getLoading,
} from './store';
import Button from './components/Button';
import TodoList from './components/TodoList';
import Filter from './components/Filter';

const getAppData = async (): Promise<Todo[]> => {
  const todosFromServer = await api.getTodos();
  const users = await api.getUsers();

  await new Promise(ok => setTimeout(ok, 1000));

  return todosFromServer.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
};

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  const loading = useSelector(getLoading);
  const query = useSelector(getQuery);

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
      <h1 className="title">
        Redux list of todos
        {' '}
        {query}
      </h1>


      {!todos.length ? (
        <Button
          text={loading ? 'Loading...' : 'Load'}
          disabled={loading}
          onClick={initData}
        />
      ) : (
        <>
          <Filter />
          <TodoList />
        </>
      )}

    </div>
  );
};

export default App;
