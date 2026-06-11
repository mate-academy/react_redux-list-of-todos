import { useEffect } from 'react';
import { getTodos } from './api';
import { setTodos, setLoading, setError } from './features/todos';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.todos.loading);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(setLoading(true));
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => dispatch(setError('Failed to load todos')));
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
              <TodoList />
            </div>

            {currentTodo && <TodoModal />}
          </div>
        </div>
      </div>
    </>
  );
};
