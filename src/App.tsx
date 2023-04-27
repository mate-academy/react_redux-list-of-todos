/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { filterTodos } from './app/filterTodos';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(response => dispatch(todosActions.add(response)));
  }, []);

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
              {todos
                ? <TodoList todos={filterTodos(todos, filter)} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} />
      )}
    </>
  );
};
