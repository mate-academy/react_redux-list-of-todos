import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { Todo } from './types/Todo';
import { setCurrentTodo } from './features/currentTodo';

export const App = () => {
  const [loading, setLoading] = useState(false);

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();

      dispatch(setTodos(data));
    } catch {
      dispatch(setTodos([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={status}
                setQuery={(val: string) => dispatch(setQuery(val))}
                setFilter={(val: string) => dispatch(setStatus(val))}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={(val: Todo | null) =>
                  dispatch(setCurrentTodo(val))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={(val: Todo | null) => dispatch(setCurrentTodo(val))}
        />
      )}
    </>
  );
};
