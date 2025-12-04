import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { useEffect } from 'react';
import { getTodos } from './api';

export const App = () => {
  const loading = useAppSelector(state => state.todos.loading);
  const { isModalOpened, user } = useAppSelector(
    state => state.currentTodo,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.setLoading(true));

    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
        dispatch(todosActions.setError(''));
      })
      .catch(() => {
        dispatch(todosActions.setError('Failed to load todos from server'));
      })
      .finally(() => {
        dispatch(todosActions.setLoading(false));
      });
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
          </div>
        </div>
      </div>

      {isModalOpened && user && <TodoModal />}
    </>
  );
};
