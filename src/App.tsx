/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector, useDebounce } from './app/hooks';
import { actions as todoActions } from './features/todos';
import { getActiveTodos } from './services/activeTodos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isTodos = useAppSelector(state => state.todos);
  const isSelectedTodos = useAppSelector(state => state.currentTodo !== null);
  const { query, status } = useAppSelector(state => state.filter);
  const debauncedQuery = useDebounce(query);
  const filteredTodos = getActiveTodos(isTodos, status, debauncedQuery);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(
        todoActions.setTodos(todos),
      ));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isTodos.length ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList todos={filteredTodos} />
                </div>

              </>
            )}
          </div>
        </div>
      </div>

      {isSelectedTodos && (
        <TodoModal />
      )}
    </>
  );
};
