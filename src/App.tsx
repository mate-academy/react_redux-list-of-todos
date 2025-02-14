import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Завантаження списку завдань
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Обробник відкриття модального вікна
  const handleShowTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);
    setUserDetails(null);

    try {
      const user = await getUser(todo.userId);

      setUserDetails(user);
    } finally {
      setIsUserLoading(false);
    }
  };

  // Обробник закриття модального вікна
  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUserDetails(null);
  };

  // Фільтрація завдань

  useEffect(() => {
    let filtered = todos;

    // Фільтрація за статусом
    if (statusFilter !== 'all') {
      filtered = todos.filter(todo =>
        statusFilter === 'completed' ? todo.completed : !todo.completed,
      );
    }

    // Фільтрація за пошуковим запитом
    if (searchQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [todos, statusFilter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                search={searchQuery}
                onStatusChange={setStatusFilter}
                onSearchChange={setSearchQuery}
                onClearSearch={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  onHideTodo={handleCloseModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={userDetails}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
