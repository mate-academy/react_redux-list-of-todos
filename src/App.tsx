/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { actions } from './features/todos';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';

interface FiltersType {
  query: string;
  status: string;
}

export const App: React.FC = () => {
  const selected = useAppSelector<Todo | null>(state => state.selected);
  const todos = useAppSelector<Todo[]>(state => state.todos);
  const filters = useAppSelector<FiltersType>(state => state.filter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos().then(elem => dispatch(actions.setTodos(elem)));
  }, []);

  const inputQuery = filters.query.toLowerCase().trim();

  function filteredTodos() {
    switch (filters.status) {
      case 'active':
        return todos.filter(
          todo =>
            todo.title.toLowerCase().includes(inputQuery) && !todo.completed,
        );
      case 'completed':
        return todos.filter(
          todo =>
            todo.title.toLowerCase().includes(inputQuery) && todo.completed,
        );
      default:
        return todos.filter(todo =>
          todo.title.toLowerCase().includes(inputQuery),
        );
    }
  }

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
              {todos.length === 0 && <Loader />}

              <TodoList todos={filteredTodos()} />
            </div>
          </div>
        </div>
      </div>

      {selected && <TodoModal />}
    </>
  );
};
