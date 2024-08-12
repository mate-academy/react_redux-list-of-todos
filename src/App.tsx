import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.setTodos(todosFromServer));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">
                  {error && <p>Error while downloading todos</p>}
                  {!!todos.length && <TodoList />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
