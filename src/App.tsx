import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { TodoList } from './components/TodoList/';
import { CurrentUser } from './components/CurrentUser/';

import { loadTodos, sortedTodos, currentUser } from './store';
import { todosFromServer } from './api/api';

const App = () => {
  const todos = useSelector(sortedTodos);
  const user = useSelector(currentUser);

  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(loadTodos(todosFromServer));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>

      {todos.length === 0
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
