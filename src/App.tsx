/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { Filters } from './types/Filters';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const filters = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos().then(response => {
      dispatch(setTodos(response));
    }).finally(() => setLoading(false));
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    let newTodos = todos;
    const trimedQuery = filters.query.trim();

    if (trimedQuery) {
      newTodos = newTodos.filter(todo => todo.title.includes(trimedQuery));
    }

    switch (filters.filter) {
      case Filters.Completed: newTodos = newTodos.filter(todo => todo.completed);
        break;
      case Filters.Active: newTodos = newTodos.filter(todo => !todo.completed);
        break;
      default: return newTodos;
    }

    return newTodos;
  }, [todos, filters]);

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
              {loading
                ? <Loader />
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
