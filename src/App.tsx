/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Status as SortType } from './types/Status';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(res => dispatch(todosActions.setTodos(res)))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = [...todos];

    switch (filter.filter) {
      case SortType.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case SortType.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (filter.query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title
          .toLocaleLowerCase()
          .includes(filter.query.toLocaleLowerCase()),
      );
    }

    return filteredTodos;
  }, [filter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} loading={loading} />
            </div>

            <div className="block">
              {loading ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
