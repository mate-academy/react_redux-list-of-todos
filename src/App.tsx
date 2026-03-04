import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/store';
import { todosSlice } from './features/todos';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';

export const App = () => {
  const { isLoading, error } = useAppSelector(state => state.todos);
  const { setTodos, setLoading, setError } = todosSlice.actions;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setError(''));

    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .catch((e: Error) => {
        dispatch(setError(e.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, setError, setLoading, setTodos]);

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
              {isLoading && <Loader />}

              {!isLoading && !error && <TodoList />}

              {!isLoading && error && (
                <p className="notification is-danger">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
