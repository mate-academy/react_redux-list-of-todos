import { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todosSlice.actions.setLoading(true));

    getTodos()
      .then(todos => {
        dispatch(todosSlice.actions.setTodos(todos));
      })
      .catch(() => {
        dispatch(todosSlice.actions.setError('Something went wrong!'));
      })
      .finally(() => {
        dispatch(todosSlice.actions.setLoading(false));
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

            <TodoList />
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
