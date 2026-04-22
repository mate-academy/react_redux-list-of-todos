import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/store';
import { todosSlice } from './features/todos';

export const App = () => {
  const { todos, currentTodo } = useAppSelector(store => store);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true);
        const todosFromServer = await getTodos();

        dispatch(todosSlice.actions.setTodos(todosFromServer));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
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
              {!error && loading && <Loader />}
              {error &&
                !loading &&
                'Something went wrong when loading todos. Try again.'}
              {todos.length === 0 &&
                !loading &&
                !error &&
                'There no todos to show.'}
              {todos.length !== 0 && !error && !loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
