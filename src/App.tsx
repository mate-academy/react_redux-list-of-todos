import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { useEffect } from 'react';
import { setLoading, setTodos } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state: RootState) => state.currentTodo);
  const loading = useAppSelector((state: RootState) => state.todos.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        throw new Error(error);
      })
      .finally(() => dispatch(setLoading(false)));
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
              <div style={{ display: loading ? 'none' : 'block' }}>
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
      {todo && <TodoModal />}
    </>
  );
};
