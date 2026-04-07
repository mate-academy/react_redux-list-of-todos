import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useMemo, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectTodos } from './utils/selectTodos';
import { setTodos } from './features/todos';
import { clearSelectedTodo, selectTodo } from './features/currentTodo';
import { Todo } from './types/Todo';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const statusFilter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const handleSelectTodo = (todo: Todo) => {
    dispatch(selectTodo(todo));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearSelectedTodo());
  };

  const filteredTodos = useMemo(() => {
    const todosByStatus = selectTodos(todos, statusFilter);

    const normalizedQuery = query.toLowerCase().trim();

    return todosByStatus.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }, [todos, statusFilter, query]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      // eslint-disable-next-line no-console
      .catch(() => console.error('Failed to fetch todos'))
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

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
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={handleSelectTodo}
                  currentTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && currentTodo && (
        <TodoModal currentTodo={currentTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
