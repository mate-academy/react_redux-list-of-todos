import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);

    getTodos()
      .then(todos => dispatch(todosSlice.actions.setTodos(todos)))
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">{loading ? <Loader /> : <TodoFilter />}</div>

            <div className="block">
              {!error ? <TodoList /> : <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
