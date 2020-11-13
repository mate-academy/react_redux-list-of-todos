import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { todosFromServer } from './components/api/api';

import {
  startLoading,
  finishLoading,
  getIsLoaded,
  fetchTodo,
  getSortTodos,
  getUser,
  setUserId,
} from './store';

import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getSortTodos);
  const isLoaded = useSelector(getIsLoaded);
  const user = useSelector(getUser);
  const selectedUserId = useSelector(setUserId);

  const loadTodos = () => {
    dispatch(startLoading());
    dispatch(fetchTodo(todosFromServer));
    dispatch(finishLoading());
  };

  return (
    <div className="App">
      {!isLoaded
        ? (
          <>
            <button
              type="button"
              className="App.beautiful.button"
              onClick={loadTodos}
            >
              {'START LOADING!'}
            </button>
          </>
        )
        : (
          <>
            <div className="App__sidebar">
              <TodoList
                todos={todos}
              />
            </div>

            <div className="App__content">
              <div className="App__content-container">
              {user !== null && selectedUserId > 0 ? (
                <CurrentUser
                  user = {user}
                />
              )
                : 'No user selected'}
              </div>
           </div>
          </>
        )}
    </div>
  );
};

export default App;
