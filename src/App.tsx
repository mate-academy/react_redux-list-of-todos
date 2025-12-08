import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

const { actions } = todosSlice;

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    getTodos()
      .then(data => {
        dispatch(actions.set(data));
      })
      .catch(() => setErrorMessage('Failed to fetch Todos'))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

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
              <div data-cy="error">{errorMessage}</div>
              {isLoading && <Loader />}
              {!errorMessage && !isLoading && todos.length && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
