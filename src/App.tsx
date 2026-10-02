import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(todosSlice.actions.set(todos)))
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
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
              {error && <p className="notification is-danger">{error}</p>}
              {loading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal key={currentTodo.id} />}
    </>
  );
};
