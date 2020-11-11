import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { todosFromServer } from './components/api/api';

import {
  startLoading,
  finishLoading,
  getIsLoaded,
  setTodos,
  getSortTodos,
} from './store';

import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getSortTodos);
  const isLoaded = useSelector(getIsLoaded);

  const fetchTodos = async() => {
    const result = await todosFromServer();
    dispatch(startLoading());
    dispatch(setTodos(result));
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
              onClick={fetchTodos}
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
                <CurrentUser
                  />
              </div>
           </div>
          </>
        )}
    </div>
  );
};

export default App;
