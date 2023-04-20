import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todoActions } from './features/todos';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const { query, status } = filter;

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const todosData = await getTodos();

        dispatch(todoActions.setTodos(todosData));
      } catch (error) {
        window.console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getAllTodos();
  }, []);

  const visibleTodos = useMemo(() => (
    getFilteredTodos(todos, query, status)
  ), [todos, query, status]);

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
                : (
                  <>
                    {hasError && (
                      <p className="has-text-danger">
                        Something went wrong, please reload the page!
                      </p>
                    )}
                    {!hasError && <TodoList visibleTodos={visibleTodos} />}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal currentTodo={currentTodo} />
      )}
    </>
  );
};
