import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { actions } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const { todos, error, loading } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.setLoading(true));
    getTodos()
      .then(t => dispatch(actions.set(t)))
      .catch(() => dispatch(actions.setError('Error')))
      .finally(() => dispatch(actions.setLoading(false)));
  }, []);

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
              {error && <p>{error}</p>}
              {todos.length === 0 && !loading && !error && <p>No data</p>}
              {todos.length > 0 && <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
