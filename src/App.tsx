import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Status } from './types/Status';
import { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App = () => {
  const [status, setStatus] = useState<Status>('all');
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const handleFilterChange = (status: Status, search: string) => {
    setStatus(status);
    setSearch(search);
  };

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalLoading(true);
    setIsModalOpen(true);

    getUser(todo.userId).then(userData => {
      setUser(userData);
      setModalLoading(false);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                currentStatus={status}
                currentSearch={search}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodo={selectedTodo}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedTodo={setSelectedTodo}
                  status={status}
                  search={search}
                  todos={todos}
                  openModal={openModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        todo={selectedTodo}
        user={user}
        loading={modalLoading}
      />
    </>
  );
};
