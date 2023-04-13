/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';
import { filterTodos } from './utils/helpers/filterTodos';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const [isLoadingError, setIsLoadingError] = useState(false);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      dispatch(actions.addTodos(todosFromServer));
      setIsLoadingError(false);
    } catch {
      setIsLoadingError(true);
    }
  };

  useEffect(() => {
    loadTodos();
  });

  const visibleTodos = filterTodos(todos, filter);

  const isLoading = !todos.length && !isLoadingError;

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
              {isLoading
                ? <Loader />
                : <TodoList todos={visibleTodos} />}

              {isLoadingError && (
                <p className="notification is-warning">
                  Can`t load todos from server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
