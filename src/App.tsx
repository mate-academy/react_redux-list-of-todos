import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { setQuery, setStatus } from './features/filter';
import { Status } from './types/Status';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [error, setError] = useState<null | unknown>(null);

  const handleStatusChange = (newStatus: string) => {
    dispatch(setStatus(newStatus as Status));
  };

  const handleQueryChange = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (err: unknown) {
        setError(err);
        // eslint-disable-next-line no-console
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [status, query]);

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

    default:
      break;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status} // Используй status из Redux
                setStatus={handleStatusChange} // Изменяем статус через Redux
                query={query} // Используй query из Redux
                setQuery={handleQueryChange} // Изменяем query через Redux
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
