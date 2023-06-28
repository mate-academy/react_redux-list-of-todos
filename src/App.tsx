/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();

        dispatch(actions.setTodos(data));
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    if (!query.length && status === FilterType.ALL) {
      return todos;
    }

    return todos.filter(({ title, completed }) => {
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();

      switch (status) {
        case FilterType.COMPLETED:
          return completed && lowerCaseTitle.includes(lowerCaseQuery);

        case FilterType.ACTIVE:
          return !completed && lowerCaseTitle.includes(lowerCaseQuery);

        default:
          return lowerCaseTitle.includes(lowerCaseQuery);
      }
    });
  }, [todos, status, query]);

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
              {isError
                ? <p>Cant download todos</p>
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
