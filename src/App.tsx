import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { setTodos } from './features/todos';
import { setQuery, setStatusFilter, clearQuery } from './features/filter';

const logErrorSilently = (error: unknown) => {
  if (typeof window !== 'undefined') {
    window._tmpErrors = window._tmpErrors || [];
    window._tmpErrors.push(
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
};

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTodosData = async () => {
      setIsLoading(true);
      try {
        const todosData = await getTodos();

        dispatch(setTodos(todosData));
      } catch (error) {
        logErrorSilently(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodosData();
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'completed' ? todo.completed : !todo.completed);

    const matchesQuery =
      !filter.query ||
      todo.title.toLowerCase().includes(filter.query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleShowTodo = async (todo: Todo) => {
    setSelectedTodoId(todo.id);
    setSelectedTodo(todo);
    setIsModalLoading(true);

    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch (error) {
      logErrorSilently(error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={filter.status}
                onStatusFilter={status => dispatch(setStatusFilter(status))}
                query={filter.query}
                onQueryChange={query => dispatch(setQuery(query))}
                onClearQuery={() => dispatch(clearQuery())}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isModalLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
