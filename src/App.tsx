/* eslint-disable max-len */
import { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as statusActions } from './features/filter';
import { actions } from './features/currentTodo';
import { Status } from './components/enums/Status';
import { getPreparedTodos } from './components/helpers';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const isShowTodoList = !!todos.length && !isLoading && !hasError;

  useEffect(() => {
    getTodos()
      .then(response => dispatch(todosActions.loadTodo(response)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const visibleTodos = useMemo(
    () => getPreparedTodos(todos, { query, status }),
    [query, status, todos],
  );

  const handleSelectStatus = useCallback(
    (selectedStatus: Status) => {
      dispatch(statusActions.setStatus(selectedStatus));
    },
    [dispatch],
  );

  const handleEnterQuery = useCallback(
    (enteredQuery: string) => {
      dispatch(statusActions.setQuery(enteredQuery));
    },
    [dispatch],
  );

  const handleSelectTodo = useCallback(
    (todo: Todo) => {
      dispatch(actions.setTodo(todo));
    },
    [dispatch],
  );

  const handleDeselectTodo = useCallback(() => {
    dispatch(actions.removeTodo());
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectStatus={handleSelectStatus}
                onEnterQuery={handleEnterQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {hasError && (
                <p className="notification is-warning">Something went wrong!</p>
              )}

              {isShowTodoList && (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={handleSelectTodo}
                  currentTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal currentTodo={currentTodo} onClose={handleDeselectTodo} />
      )}
    </>
  );
};
