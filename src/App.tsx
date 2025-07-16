/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  // const dispatch = useDispatch();
  // const todos = useAppSelector(state => state.todos);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  const fetchTodos = (getTodosFn: () => Promise<Todo[]>) => {
    setLoading(true);
    getTodosFn()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Try again later');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos(() => getTodos());
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, normalizedQuery]);

  const handleSelectChange = (value: string) => {
    setStatus(value as Status);
  };

  const handleInputChange = (value: string) => {
    setQuery(value as Status);
  };

  const handleClearInput = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                selectedValue={status}
                inputValue={query}
                onSelect={value => handleSelectChange(value)}
                onChange={value => handleInputChange(value)}
                onClearClick={handleClearInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {errorMessage && (
                <p className="notification is-danger">{errorMessage}</p>
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={todo => setSelectedTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClick={setSelectedTodo} />
      )}
    </>
  );
};
