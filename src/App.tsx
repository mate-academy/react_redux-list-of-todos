/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getFilteredTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedTodos = await getTodos();
      const visibleTodos = getFilteredTodos(fetchedTodos, query, status);

      dispatch(todosActions.setTodos(visibleTodos));
      setIsLoading(false);
    })();
  }, [query, status]);

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
              {!isLoading ? <TodoList /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
