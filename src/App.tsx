import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';

import { setTodos } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const [selectTodos, setSelectTodos] = useState<Todo | null>(null);
  const [selectUser, setSelectUser] = useState<User | null>(null);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .finally(() => setLoadingTodos(false));
  }, [dispatch]);

  const visibleTodos = todos
    .filter((todo: Todo) => {
      if (status === 'completed') {
        return todo.completed;
      }

      if (status === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter((todo: Todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

  const handleQueryChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleStatusChange = (newStatus: Status) => {
    dispatch(setStatus(newStatus));
  };

  const handleClearChange = () => {
    dispatch(setQuery(''));
  };

  const handleTodosSelect = (todo: Todo) => {
    setSelectTodos(todo);
    setLoadingUser(true);
    getUser(todo.userId)
      .then(setSelectUser)
      .finally(() => setLoadingUser(false));
  };

  const handleCloseModal = () => {
    setSelectTodos(null);
    setSelectUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={handleQueryChange}
                onQueryClear={handleClearChange}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}

              {!loadingTodos && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleTodosSelect}
                  selectTodoId={selectTodos?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodos && (
        <TodoModal
          todo={selectTodos}
          user={selectUser}
          isUserLoading={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
