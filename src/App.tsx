import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/store';
import { useEffect } from 'react';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(todosSlice.actions.setLoading(true));
    getTodos()
      .then(loadedTodos => {
        dispatch(todosSlice.actions.setTodos(loadedTodos));
      })
      .catch(error => {
        throw error;
      })
      .finally(() => dispatch(todosSlice.actions.setLoading(false)));
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
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
