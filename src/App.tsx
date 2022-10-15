/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as AddTodosAction } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const getTodosFromServer = useCallback(async () => {
    const todosFromServer: Todo[] = await getTodos();

    dispatch(AddTodosAction.addTodos(todosFromServer));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, [getTodosFromServer()]);

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
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>

      { currentTodo && (
        <TodoModal />
      )}

    </>
  );
};
