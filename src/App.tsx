import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { setQuery, setStatus } from './features/filter';
import { Status } from './types/Status';

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodos = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(response => {
        dispatch(setTodos(response));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as Status));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  const handleClearSearch = () => {
    dispatch(setQuery(''));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={status}
                setSelectedFilter={handleFilterChange}
                searchTerm={query}
                setSearchTerm={handleSearchChange}
                onClear={handleClearSearch}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodos && <TodoModal />}
    </>
  );
};
