/* eslint-disable max-len */

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import {
  TODOS_SELECTORS,
  fetchTodos,
} from './features/todos';

export const App: React.FC = () => {
  const [todoSelect, setTodoSelect] = useState(0);
  const dispatch = useDispatch();
  const todos = useSelector(TODOS_SELECTORS.todosBySearchQuery(''));

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todo = todos.find(element => element.id === todoSelect) || null;
  const onClose = () => {
    setTodoSelect(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={todos}
                    setTodoSelect={setTodoSelect}
                    todoSelect={todoSelect}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {todoSelect !== 0
        && (
          <TodoModal
            todo={todo}
            onClose={onClose}
          />
        )}
    </>
  );
};
