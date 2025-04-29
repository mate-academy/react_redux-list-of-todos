import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { AppDispatch, useAppSelector } from './app/store';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';

export const App = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const query = useAppSelector(state => state.filter.query);
  const filteredStatus = useAppSelector(state => state.filter.status);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => setError('Error'))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = todos
    .filter(todo => {
      switch (filteredStatus) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
        case 'all':
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
              {error && (
                <p className="notification is-warning">
                  Error occurred while fetching todos. Please try again later.
                </p>
              )}
              {!error && !isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
