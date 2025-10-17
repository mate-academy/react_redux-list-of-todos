import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/todos';
import { actions as actionsCurrentTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(s => s.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const openModal = (todo: Todo) => {
    dispatch(actionsCurrentTodo.setTodo(todo));
    setModal(true);
  };

  function onClose() {
    setModal(false);
    dispatch(actionsCurrentTodo.clearCurrent());
  }

  const visibleTodos = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      todos: Todo[],
      {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        query,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        status,
      }: { query: string; status: Status },
    ) => {
      let preparedTodos = todos;
      const normalizedQuery = query.trim().toLowerCase();

      if (normalizedQuery) {
        preparedTodos = preparedTodos.filter((todo: { title: string }) =>
          todo.title.toLowerCase().includes(normalizedQuery),
        );
      }

      if (status === 'active') {
        preparedTodos = preparedTodos.filter(
          (todo: { completed: boolean }) => todo.completed === false,
        );
      }

      if (status === 'completed') {
        preparedTodos = preparedTodos.filter(
          (todo: { completed: boolean }) => todo.completed === true,
        );
      }

      return preparedTodos;
    },
    [todos, query, status],
  );

  useEffect(() => {
    getTodos()
      .then(data => dispatch(actionsTodos.setTodos(data)))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading && <Loader />}
            {!loading && <h1 className="title">Todos:</h1>}

            {!loading && (
              <div className="block">
                <TodoFilter />
              </div>
            )}

            {!loading && error && (
              <div className="notification is-danger">{error}</div>
            )}

            <div className="block">
              {!loading && !error && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos(todos, { query, status })}
                  onShow={openModal}
                  selectedTodo={currentTodo}
                />
              )}
              {!loading && !error && todos.length === 0 && (
                <p className="title is-5">There are no todos</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal modal={modal} onClose={onClose} />
    </>
  );
};
