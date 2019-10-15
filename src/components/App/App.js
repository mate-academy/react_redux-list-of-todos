import React from 'react';
import Button from '../Button/Button';
import { TodoItemSort } from '../TodoItemSort';
import { TodoList } from '../TodoList';

import './App.css';

const App = ({
  todos, users, isLoading, loadData,
}) => (
  <div className="App">
    <h1>Dynamic list of todos</h1>
    <div className="container">

      <div className="content">
        {todos.length === 0
          ? (
            <div>
              {isLoading
                ? (
                  <button
                    className="btn btn-primary"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                  </button>
                )
                : ''
              }
              <div>
                <Button
                  className="btn--start"
                  text="Load"
                  onClick={loadData}
                />
              </div>
            </div>
          )
          : (
            <div>
              <p>
                <span>Todos: </span>
                {todos.length}
              </p>

              <p>
                <span>Users: </span>
                {users.length}
              </p>
              <TodoItemSort />
              <TodoList />
            </div>
          )
        }
      </div>
    </div>
  </div>
);

export default App;
