import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { AppDispatch, RootState } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos.items);
  const filterStatus = useSelector((state: RootState) => state.filter.status);
  const searchQuery = useSelector((state: RootState) => state.filter.query);
  const selectedTodo = useSelector(
    (state: RootState) => state.currentTodo.item,
  );

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todosData: Todo[]) => {
        dispatch(loadTodos(todosData));
      })
      .catch(() => {
        setErr('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...todos];

    switch (filterStatus) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;

      case 'all':
      default:
        filtered = [...todos];
        break;
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (normalizedQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    setFilteredTodos(filtered);

    if (filtered.length === 0 && (normalizedQuery || filterStatus !== 'all')) {
      setErr('There are no todos matching current filter criteria');
    } else if (err !== 'Unable to load todos') {
      setErr('');
    }
  }, [todos, filterStatus, searchQuery]);

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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} error={err} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal setErr={setErr} />}
    </>
  );
};
