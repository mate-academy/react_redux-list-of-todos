import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setError, setLoading, setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.items);
  const isTodosLoad = useAppSelector(state => state.todos.loading);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  useEffect(() => {
    dispatch(setLoading(true));

    getTodos()
      .then(todosData => {
        dispatch(setTodos(todosData));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch todos:', error);
        dispatch(setError(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);

    setIsUserLoading(true);

    getUser(todo.userId)
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch user:', error);
        setUser(null);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setUser(null);
    setIsUserLoading(false);
  };

  const visibleTodos = useMemo(() => {
    let filtered = [...todos];

    if (status === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (query.trimStart()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.trimStart().toLowerCase()),
      );
    }

    return filtered;
  }, [todos, status, query]);

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
              {isTodosLoad ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={handleTodoSelect}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalClose}
          user={user}
          isLoading={isUserLoading}
        />
      )}
    </>
  );
};
