import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { TodoList } from './components/TodoList/';
import { CurrentUser } from './components/CurrentUser/';

import { loadTodos, sortedTodos, currentUser, startLoad, startState } from './store';
import { todosFromServer } from './api/api';

const App = () => {
  const todos = useSelector(sortedTodos);
  const user = useSelector(currentUser);
  const start = useSelector(startState);

  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(startLoad(true));
    dispatch(loadTodos(todosFromServer));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>

      {!start
        ? (
          <button
            className="button"
            type="button"
            onClick={getTodos}
          >
            Start
          </button>
        )
        : (
          <div className="App__container">
            <div className="App__sidebar">
              <div className="TodoList">
                <TodoList todos={todos} />
              </div>
            </div>
            <div className="App__content">
              {user
                ? (<CurrentUser user={user} />)
                : ('No user selected')
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default App;
