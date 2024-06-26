/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((data: Todo[]) => {
        dispatch(todosSlice.actions.setTodos(data));
      })
      .catch(() => {
        return (
          <p style={{ color: 'red' }}>Something went wrong, try again later</p>
        );
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">{!loading && <TodoFilter />}</div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !!todos.length && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
