import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from './app/store';
import { actions as actionsTodos } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useCallback, useEffect, useMemo, useState } from 'react';

// type StatusType = 'success' | 'loading' | 'error';

type Status =
  | { type: 'success' }
  | { type: 'loading' }
  | { type: 'error'; error: string };

export const App = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();
  const [status, setStatus] = useState<Status>({ type: 'loading' });

  const addTodo = useCallback(
    (todo: Todo) => dispatch(actionsTodos.add(todo)),
    [dispatch],
  );

  useEffect(() => {
    getTodos()
      .then(fetchTodos => {
        fetchTodos.forEach(todo => addTodo(todo));
        setStatus({ type: 'success' });
      })
      .catch((error: Error) => {
        setStatus({ type: 'error', error: error.message });
      });
  }, [addTodo]);

  const filteredTodos = useMemo(() => {
    const trimQuery = filter.query.trim();

    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(trimQuery.toLowerCase());

      switch (filter.status) {
        case 'active':
          return matchesQuery && !todo.completed;

        case 'completed':
          return matchesQuery && todo.completed;

        case 'all':
        default:
          return matchesQuery;
      }
    });
  }, [todos, filter.query, filter.status]);

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
              {status.type === 'loading' && <Loader />}
              {status.type === 'success' && (
                <TodoList filteredTodos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
