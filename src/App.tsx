/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector, useDebounce } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { prepareTodos } from './services/prepareTodos';

export const App: React.FC = () => {
  // const debouncedQuery = useDebounce(query);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(serverTodos => dispatch(todosActions.setTodos(serverTodos)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const debauncedQuery = useDebounce(query);

  const filteredTodos = prepareTodos(todos, status, debauncedQuery);

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
              {!todos.length
                ? <Loader />
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
