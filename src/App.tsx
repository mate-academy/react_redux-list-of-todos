import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setError, setTodos, startLoading } from './features/todos';
import { User } from './types/User';
import { clearCurrentTodo } from './features/currentTodo';

export const App = () => {
  const dispatch = useAppDispatch();

  const { items: todos, loading, error } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  //#region  for local user
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setUser(null);
    setUserError('');
    setUserLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(e => setUserError(e.message))
      .finally(() => setUserLoading(false));
  }, [selectedTodo]);

  //#endregion

  //#region for data from server
  const loadTodos = useCallback(() => {
    dispatch(startLoading());

    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(e => dispatch(setError(e.message || 'Failed to load todos')));
  }, [dispatch]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  //#endregion

  //#region modal block
  const handleCloseModal = () => {
    dispatch(clearCurrentTodo());
  };

  //#endregion

  //#region filter todo list
  function getPreparedTodos(todosList: Todo[], value: string) {
    return todosList
      .filter(todo => {
        return todo.title.toLowerCase().includes(value.toLowerCase());
      })
      .filter(todo => {
        switch (status) {
          case 'all':
            return todo.completed || !todo.completed;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
        }
      });
  }

  const filterTodos = getPreparedTodos(todos, query);

  //#endregion

  //#region error
  const handleRetryUser = () => {
    loadTodos();
  };

  if (error) {
    return (
      <div
        className="is-flex is-justify-content-center is-align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="notification">
          <h2 className="title is-4">Oops! Something went wrong</h2>
          <p
            className={`
            is-flex
            is-justify-content-center
            is-align-items-center
          `}
          >
            Error details: {error}
          </p>
          <button
            className="button is-medium retry-btn"
            onClick={handleRetryUser}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  //#endregion

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
              {loading && !todos.length && <Loader />}

              {!loading && <TodoList todos={filterTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleCloseModal}
          user={user}
          loading={userLoading}
          error={userError}
          onRetry={handleRetryUser}
        />
      )}
    </>
  );
};
