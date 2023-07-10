/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { actions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { filteringBySearch, filteringBySelect } from './utils/todosFiltering';

export const App: React.FC = () => {
  const todosFromServer = useAppSelector(state => state.todos);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const setTodos = (todos: Todo[]) => dispatch(actions.setTodos(todos));
  const activeTodo = useAppSelector(state => state.currentTodo);
  const filterState = useAppSelector(state => state.filter);
  const { query, status } = filterState;

  const todosAfterSelect = useMemo(() => {
    return filteringBySelect(todosFromServer, status);
  }, [todosFromServer, status]);

  const todosAfterSearch = useMemo(() => {
    return filteringBySearch(todosAfterSelect, query);
  }, [query, todosAfterSelect]);

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodos(todos);
        setIsLoaded(true);
      })
      .catch(errorMessage => setError(`smth happens - ${errorMessage}`))
      .finally(() => setIsLoaded(true));
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
              {!isLoaded && <Loader />}
              {(!todosAfterSearch.length && query) ? (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )
                : <TodoList todosAfterSearch={todosAfterSearch} />}
            </div>
          </div>
        </div>
      </div>
      {error}
      {activeTodo && (<TodoModal />)}
    </>
  );
};
