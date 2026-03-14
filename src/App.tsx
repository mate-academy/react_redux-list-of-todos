import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setItems, setLoading, setError } from './features/todos/todosSlice';
import { setQuery, setStatus } from './features/filter/filterSlice';
import { setCurrentTodo, clearCurrentTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todosLoading = useAppSelector(s => s.todos.status === 'loading');
  const todos = useAppSelector(s => s.todos.items);
  const filter = useAppSelector(s => s.filter);
  const query = filter.query.toLowerCase();
  const status = filter.status;
  const selectedTodo = useAppSelector(s => s.currentTodo);
  const filteredTodos = todos
    .filter(t => t.title.toLowerCase().includes(query))
    .filter(t =>
      status === 'all'
        ? true
        : status === 'completed'
          ? t.completed
          : !t.completed,
    );

  const handleQueryChange = (q: string) => dispatch(setQuery(q));

  const handleFilterChange = newStatus => dispatch(setStatus(newStatus));
  const handleClearQuery = () => dispatch(setQuery(''));

  const handleClose = () => dispatch(clearCurrentTodo());
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const handleShow = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
    setUserLoading(true);
    getUser(todo.userId)
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setUserLoading(false));
  };

  useEffect(() => {
    dispatch(setLoading());
    getTodos()
      .then(todosFromServer => dispatch(setItems(todosFromServer)))
      .catch(err => dispatch(setError(err.message || 'Failed to load')));
  }, [dispatch]);

  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {!todosLoading && (
                <TodoFilter
                  filter={status}
                  query={query}
                  onFilterChange={handleFilterChange}
                  onQueryChange={handleQueryChange}
                  onClearQuery={handleClearQuery}
                />
              )}
            </div>

            <div className="block">
              {todosLoading && <Loader />}
              {!todosLoading && (
                <TodoList
                  todos={filteredTodos}
                  onShow={handleShow}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>

            {selectedTodo !== null && (
              <TodoModal
                completed={selectedTodo.completed}
                userName={user ? user.name : 'User'}
                userEmail={user ? user.email : ''}
                todo={selectedTodo}
                isLoading={userLoading}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
