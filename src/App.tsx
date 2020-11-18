import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { todosFromServer } from './components/api/api';

import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { getSortTodos, isLoading, getUser, setUserId, fetchTodo } from './store';
import { startLoading, finishLoading } from './store/loadingPage';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getSortTodos);
  const loading = useSelector(isLoading);
  const user = useSelector(getUser);
  const selectedUserId = useSelector(setUserId);

  const loadTodos = () => {
    dispatch(startLoading());
    dispatch(fetchTodo(todosFromServer));
    dispatch(finishLoading());
  };
  return (
    <div className="App">
      {!loading
        ? (
          <div className="App__download">
            <button
              type="button"
              className="App__beautiful-button"
              onClick={loadTodos}
            >
              {'START LOADING!'}
            </button>
          </div>
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
              {user !== null && selectedUserId ? (
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
