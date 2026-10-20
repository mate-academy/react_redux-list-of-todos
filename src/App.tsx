import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const queryTodos = todos.filter(todo =>
    todo.title.trim().toLocaleLowerCase().includes(normalizedQuery),
  );

  const filteredTodos = queryTodos.filter(todo => {
    switch (status) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isLoading && <h1 className="title">Todos:</h1>}

            {error && <p>Error</p>}

            {!isLoading && (
              <div className="block">
                <TodoFilter todos={todos} />
              </div>
            )}

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
