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
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, status } = useSelector((state: RootState) => state.filter);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const handleStatusChange = (newStatus: string) => {
    dispatch(setStatus(newStatus as Status));
  };

  const handleQueryChange = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        dispatch(setTodos(data));
      } catch (err: unknown) {
        // eslint-disable-next-line no-console
        console.warn('Ошибка загрузки TODO:', err);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      if (status === 'completed') {
        return todo.completed;
      }

      if (status === 'active') {
        return !todo.completed;
      }

      return true;
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={handleStatusChange}
                query={query}
                setQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
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
