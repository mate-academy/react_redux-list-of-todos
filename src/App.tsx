import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { Todo } from './types/Todo';
import { StatusTypes } from './features/filter';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((data: Todo[]) => {
        dispatch(setTodos(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTodos = useMemo(() => {
    const queryToLowerCase = query.toLowerCase();

    switch (status) {
      case StatusTypes.Active: {
        return todos.filter(
          (todo: Todo) =>
            !todo.completed &&
            todo.title.toLowerCase().includes(queryToLowerCase),
        );
      }

      case StatusTypes.Completed: {
        return todos.filter(
          (todo: Todo) =>
            todo.completed &&
            todo.title.toLowerCase().includes(queryToLowerCase),
        );
      }

      default: {
        return todos.filter((todo: Todo) =>
          todo.title.toLowerCase().includes(queryToLowerCase),
        );
      }
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

              {!isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {false && <TodoModal />}
    </>
  );
};
