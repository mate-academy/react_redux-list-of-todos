/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { StatusEnum } from './types/Status';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  async function getTodosFromServer() {
    setLoading(true);
    setError(false);

    try {
      const data = await getTodos();

      dispatch(todosActions.load(data));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const visibleTodos = useMemo(() => {
    if (status === StatusEnum.All && query !== '') {
      return todos?.filter(todo => todo.title.includes(query));
    }

    if (status === StatusEnum.Completed) {
      return todos?.filter(todo => {
        return todo.completed === true && todo.title.includes(query);
      });
    }

    if (status === StatusEnum.Active) {
      return todos?.filter(todo => {
        return todo.completed === false && todo.title.includes(query);
      });
    }

    return todos;
  }, [query, status, todos]);

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
              {isLoading && <Loader />}
              {!isError && !isLoading && <TodoList todos={visibleTodos} />}
              {isError && !isLoading && (
                <p className="has-text-danger has-text-weight-medium">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
