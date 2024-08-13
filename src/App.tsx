import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { todosReducer } from './features/todos';
import { StatusTypes } from './features/filter';
import { useAppDispatch, useAppSelector } from './features/useAppSelector';

export const App = () => {
  const [isLoading, setisLoading] = useState(false);

  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setisLoading(true);

    getTodos()
      .then(res => {
        dispatch(todosReducer(res));
      })
      .finally(() => {
        setisLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    switch (status) {
      case StatusTypes.Active:
        return todos
          .flat()
          .filter(
            todo =>
              !todo.completed &&
              todo.title.toLowerCase().includes(normalizedQuery),
          );
      case StatusTypes.Completed:
        return todos
          .flat()
          .filter(
            todo =>
              todo.completed &&
              todo.title.toLowerCase().includes(normalizedQuery),
          );
      default:
        return todos
          .flat()
          .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
    }
  }, [query, status, todos]);

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
              {isLoading && <Loader />}

              {!!todos && !isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
