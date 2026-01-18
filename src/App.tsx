import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './hooks/useAppSelector';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch } from './hooks/useAppDispatch';
import { set } from './features/todos';
import { close } from './features/currentTodo';
import { prepareTodos } from './helpers/prepareTodos';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const activeTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(ts => dispatch(set(ts)))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return prepareTodos(todos, {
      query,
      status,
    });
  }, [query, status, todos]);

  const handleCloseModal = () => dispatch(close());

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
                <TodoList todos={filteredTodos} activeTodo={activeTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal activeTodo={activeTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
