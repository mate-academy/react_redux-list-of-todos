import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, setLoading, setError } from './features/todos';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { setQuery, setStatus } from './features/filter';
import { clearCurrentTodo, setCurrentTodo } from './features/currentTodo';
import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.items);
  const loading = useAppSelector(state => state.todos.loading);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoad, setIsUserLoad] = useState(false);

  const selectedTodo = useAppSelector(state => state.currentTodo);

  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  const visibleTodos = filteredTodos.filter(todo =>
    todo.title.toLocaleLowerCase().includes(query.toLowerCase()),
  );

  const handleSelectTodo = (todoId: number) => {
    const todo = todos.find(item => item.id === todoId);

    if (!todo) {
      return;
    }

    if (selectedTodo?.id === todoId) {
      dispatch(clearCurrentTodo());
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(() => {
        dispatch(setError('Failed to load todos'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    setIsUserLoad(true);

    getUser(selectedTodo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsUserLoad(false));
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={value => dispatch(setStatus(value))}
                onQueryChange={value => dispatch(setQuery(value))}
                onDeleteQuery={() => dispatch(setQuery(''))}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodo?.id ?? null}
                onSelectedTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoad}
          onClose={() => dispatch(clearCurrentTodo())}
        />
      )}
    </>
  );
};
