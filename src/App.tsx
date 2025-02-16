import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { setTodos, setSelectedTodo, setUser } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { Todo } from './types/Todo';

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.todos.todo);
  const user = useAppSelector(state => state.todos.user);

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleSelectTodo = (todo: Todo) => {
    setModalLoading(true);
    dispatch(setSelectedTodo(todo));
    setIsModalOpen(true);

    getUser(todo.userId)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then(user => dispatch(setUser(user)))
      .finally(() => setModalLoading(false));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={newQuery => dispatch(setQuery(newQuery))}
                onStatusChange={newStatus => dispatch(setStatus(newStatus))}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {error && <p className="has-text-danger">{error}</p>}
              {!loading && !error && (
                <TodoList
                  todos={filteredTodos}
                  onSelectedTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal
        todo={selectedTodo}
        loading={modalLoading}
        user={user}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
