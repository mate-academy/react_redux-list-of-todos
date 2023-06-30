// eslint-disable-next-line
import React, { useEffect, useMemo, useState } from 'react';
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
import { FilterTypes } from './types/FilterTypes';
import { Notification } from './components/Notification';
import { ErrorTypes } from './types/ErrorTypes';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes>(ErrorTypes.None);

  useEffect(() => {
    const fetchTodos = () => {
      setIsLoading(true);
      getTodos()
        .then(data => {
          dispatch(actions.setTodos(data));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(ErrorTypes.Load);
        });
    };

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    if (!query.length && status === FilterTypes.ALL) {
      return todos;
    }

    return todos.filter(({ title, completed }) => {
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();

      switch (status) {
        case FilterTypes.COMPLETED:
          return completed && lowerCaseTitle.includes(lowerCaseQuery);

        case FilterTypes.ACTIVE:
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
                ? <Notification errorMessage={errorMessage} />
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
