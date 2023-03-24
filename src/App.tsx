/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { selectCurrentTodo } from './state/todos/selectors';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const currentTodo = useAppSelector(selectCurrentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const todos = await getTodos();

        dispatch(todosActions.setTodos(todos));
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
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
              {hasError && (
                <h3 style={{ color: 'tomato' }}>
                  Todos loading error
                </h3>
              )}

              {isLoading && <Loader />}

              {!isLoading && !hasError && (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
        />
      )}
    </>
  );
};
