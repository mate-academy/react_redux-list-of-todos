import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useMemo, useState } from 'react';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const [load, setLoad] = useState(true);

  const dispatch = useAppDispatch();

  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      let matchesStatus = false;

      if (status === 'all') {
        matchesStatus = true;
      } else if (status === 'active') {
        matchesStatus = !todo.completed;
      } else {
        matchesStatus = todo.completed;
      }

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  useEffect(() => {
    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .catch(() => dispatch(setTodos([])))
      .finally(() => setLoad(false));
  }, [dispatch]);

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
              {load ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};