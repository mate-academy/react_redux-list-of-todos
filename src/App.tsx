/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useAppSelector } from './app/hooks';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as todosAction } from './features/todos';
import { filterAndSortTodos } from './services/Filter';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setHasErrorMessage('');

    getTodos()
      .then(date => {
        dispatch(todosAction.setTodos(date));
      })
      .catch(() => setHasErrorMessage('Try again later'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(filterAndSortTodos(query, status, todos));
  }, [query, status, todos]);

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
              {isLoading && (<Loader />)}

              {!isLoading && !hasErrorMessage && (
                <TodoList
                  todos={filteredTodos}
                  isloading={isLoading}
                />
              )}

              {!!hasErrorMessage && <ErrorNotification errorMessage={hasErrorMessage} />}
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
