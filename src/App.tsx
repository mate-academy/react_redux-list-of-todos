import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { initTodos, setLoading, setError } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearCurrentTodo } from './features/currentTodo';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    getTodos()
      .then(response => {
        dispatch(initTodos(response));
      })
      .catch(() => {
        dispatch(setError('Oops, something went wrong'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const handleClose = () => {
    dispatch(clearCurrentTodo());
  };

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
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} onClose={handleClose} />}
    </>
  );
};
