/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { filterTodos } from './utils/func';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [isLoadingError, setIsLoadingError] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const currentFilters = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const loadTodosFromServer = async () => {
    try {
      const fetchedTodos = await getTodos();

      dispatch(todosActions.addTodos(fetchedTodos));
      setIsLoadingError(false);
    } catch {
      setIsLoadingError(true);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const visibleTodos = filterTodos(todos, currentFilters.status, currentFilters.query);

  const isLoadingFinished = (isLoadingError && !todos.length) || todos.length;

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
              {isLoadingFinished ? (
                <TodoList todos={visibleTodos} />
              ) : (
                <Loader />
              )}

              {isLoadingError && (
                <p className="has-text-danger">Some loading error</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
