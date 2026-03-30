import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const visibleTodos = todos
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
              {loading && <Loader />}
              {!loading && !errorMessage && (
                <>
                  {visibleTodos.length > 0 ? (
                    <TodoList todos={visibleTodos} />
                  ) : (
                    <p className="notification is-warning">
                      There are no todos matching current filter criteria
                    </p>
                  )}
                </>
              )}

              {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
