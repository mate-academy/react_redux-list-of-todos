import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './components/hooks/hooks';
import { useEffect } from 'react';
import { actions as todoActions } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(todoActions.setLoading(true));
    getTodos()
      .then(todosFromServer => {
        dispatch(todoActions.setTodos(todosFromServer));
      })
      .catch(() => {
        dispatch(todoActions.setError('Something went wrong'));
      })
      .finally(() => {
        dispatch(todoActions.setLoading(false));
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
              {loading && <Loader />}
              {!loading && error && <p>{error}</p>}
              {!loading && todos.length > 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
