import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { useAppSelector } from './app/hooks';
import { AppDispatch } from './app/store';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos().then(response => response);

        dispatch(todosSlice.actions.setTodos(todosFromServer));
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isLoading && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>
              </>
            )}

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && error && <p>Error while downloading todos</p>}
              {!!todos.length && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
