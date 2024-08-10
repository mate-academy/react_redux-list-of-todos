import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { useAppSelector } from './app/hooks';
import { loadingSlice } from './features/isLoading';

export const App = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const isLoading = useAppSelector(state => state.isLoading);

  useEffect(() => {
    dispatch(loadingSlice.actions.start());

    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.saveTodos(todosFromServer));

        if (todosFromServer.length === 0) {
          setError('There are no todos yet.');
        }
      })
      .catch(() => {
        setError('Something went wrong.');
      })
      .finally(() => {
        dispatch(loadingSlice.actions.stop());
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
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p className="notification is-warning">{error}</p>
              )}

              {!isLoading && !error && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
