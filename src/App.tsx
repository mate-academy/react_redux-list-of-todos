/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';
import { getTodosFilteredByStatus } from './utils/todosFiltering';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const todo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const getTodosFromServer = async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();

      dispatch(actions.setTodos(todosFromServer));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const filteredTodos = useMemo(() => {
    return getTodosFilteredByStatus(todos, filter);
  }, [todos, filter]);

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
              {isLoading && <Loader />}
              {isError && (<span>Oops! Something went wrong!</span>)}
              {!isLoading && !isError && <TodoList filteredTodos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
