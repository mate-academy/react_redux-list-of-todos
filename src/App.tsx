import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [error, setError] = useState<null | unknown>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (err: unknown) {
        // eslint-disable-next-line no-console
        console.warn(error);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [error, status, query]);

  let filteredTodos = todos?.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  switch (status) {
    case 'completed':
      filteredTodos = filteredTodos?.filter(todo => todo.completed);
      break;

    case 'active':
      filteredTodos = filteredTodos?.filter(todo => !todo.completed);
      break;

    default: {
      break;
    }
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {todos && (
                <TodoList
                  todos={filteredTodos}
                  currentTodo={currentTodo}
                  setCurrentTodo={setCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
      )}
    </>
  );
};
