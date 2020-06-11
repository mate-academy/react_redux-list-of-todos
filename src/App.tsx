import React from 'react';
import {useDispatch, useSelector, } from 'react-redux';
import './App.scss';

import {finishLoading, initTodos, startLoading} from './actions';
import {getLoading, getTodos} from './reducers';

import * as api from "./helpers/api";
import Button from "./components/Button";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

const getAppData = async (): Promise<Todo[]> => {
  const todosFromServer = await api.getTodos();
  const usersFromServer = await api.getUsers();
  return todosFromServer.map((todo) => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    }
  });
}


const App = () => {
  const dispatch = useDispatch()
  const todos = useSelector(getTodos)
  const loading = useSelector(getLoading)

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
      <div className="container">
        <h1 className="text-center">Redux list of todos {todos.length}</h1>

        {!todos.length&&
        <Button
          text={loading ? 'Loading...' : 'Init data'}
          disabled={loading}
          onClick={initData}
        />
        }

        {todos.length > 0 && <Filter/>}
        {todos.length > 0 && <TodoList />}
      </div>
    </div>

  );
};

export default App;
