import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { loadTodos } from './features/todos';
import { setQuery, setStatusFilter, clearQuery } from './features/filter';
import { RootState } from './app/store';
import { selectFilteredTodos } from './features/filter';

const logErrorSilently = (error: unknown) => {
  if (typeof window !== 'undefined') {
    window._tmpErrors = window._tmpErrors || [];
    window._tmpErrors.push(
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
};

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter);
  const filteredTodos = useSelector(selectFilteredTodos);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

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
              {todos.length === 0 ? (
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
