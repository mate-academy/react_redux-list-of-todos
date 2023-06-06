/* eslint-disable max-len */
import {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Error } from './components/Error';

import { getTodos } from './api';
import { getFilteredTodos } from './helpers';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as todoActions } from './features/currentTodo';

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const todosFromServer = await getTodos();

        dispatch(todosActions.setTodos(todosFromServer));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
              {hasError && (
                <Error />
              )}

              {isLoading && (
                <Loader />
              )}

              {!hasError && !isLoading && (
                <TodoList
                  todos={visibleTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          selectedTodo={currentTodo}
          onClose={() => dispatch(todoActions.removeTodo())}
        />
      )}
    </>
  );
};
