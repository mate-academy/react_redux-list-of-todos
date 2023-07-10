import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { useSortAndSearch } from './app/useSortAndSearch';
import { LoadingError } from './components/LoadingError';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const { query, sort } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  async function fetchTodos() {
    setIsLoading(true);
    setHasLoadingError(false);
    try {
      const todosFromServer = await getTodos();

      dispatch(todosActions.loadTodos(todosFromServer));
      setIsLoading(false);
    } catch (error) {
      setHasLoadingError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const sortedAndSearchedTodos = useSortAndSearch(
    todos,
    sort,
    query,
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            {hasLoadingError
              ? <LoadingError />
              : (
                <div className="block">
                  {isLoading
                    ? <Loader />
                    : (
                      <TodoList todos={sortedAndSearchedTodos} />
                    )}
                </div>
              )}

            {selectedTodo && <TodoModal />}
          </div>
        </div>
      </div>
    </>
  );
};
