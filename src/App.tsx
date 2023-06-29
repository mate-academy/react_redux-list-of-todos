/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { actions as todoActions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadTodos = (todosFromServer: Todo[]) => dispatch(todoActions.loadTodos(todosFromServer));

  const loadTodosFromServer = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      loadTodos(todosFromServer);
    } catch {
      throw new Error('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodosFromServer();
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal />
      )}
    </>
  );
};
