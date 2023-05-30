/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as TodosAction } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const { todos, currentTodo } = useAppSelector(state => state);
  const { isLoading } = todos;
  const todosDispatch = useAppDispatch();

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      todosDispatch(TodosAction.SetTodos(todosFromServer));
    } catch {
      todosDispatch(TodosAction.SetError(true));
    } finally {
      todosDispatch(TodosAction.SetLoading(false));
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
              {isLoading && (
                <Loader />
              )}
              <TodoList />
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
