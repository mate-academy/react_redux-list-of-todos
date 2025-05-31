import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(items => {
        dispatch(todosSlice.actions.loadTodos(items));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList query={query} status={status} />
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
