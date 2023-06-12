/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as TodoAction } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { todos, currentTodo } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const { isLoading } = todos;

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      dispatch(TodoAction.setTodos(todosFromServer));
    } catch {
      dispatch(TodoAction.setError(false));
    } finally {
      dispatch(TodoAction.setLoading(true));
    }
  };

  useEffect(() => {
    getTodosFromServer();
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
              {isLoading
                ? (
                  <TodoList />
                ) : (
                  <Loader />
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
