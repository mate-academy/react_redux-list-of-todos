import { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { setTodos } from './features/todos';
import { useAppDispatch } from './app/hooks';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load todos:', error);
      });
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
              <Loader />
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
