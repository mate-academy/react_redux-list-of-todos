import React, { useCallback, useEffect, useMemo } from 'react';
import { actions as filterActions } from './features/filter';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { actions as todoActions } from './features/currentTodo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const allTodos = useAppSelector(state => state.todos);
  const isCurrentTodo = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    getTodos().then(todos => dispatch(actions.setTodos(todos)));
  }, [dispatch]);

  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const handleQueryChange = useCallback(
    (text: string) => {
      dispatch(filterActions.setQuery(text));
    },
    [dispatch],
  );

  const handleStatusChange = useCallback(
    (text: string) => {
      dispatch(filterActions.setStatus(text));
    },
    [dispatch],
  );

  const setCurrentTodo = useCallback(
    (todo: Todo) => {
      dispatch(todoActions.setTodo(todo));
    },
    [dispatch],
  );

  const filterTodos = useCallback(
    (todos: Todo[]) => {
      if (status === Filter.All && !query) {
        return todos;
      }

      const lowerQuery = query.toLocaleLowerCase();

      return todos.filter((todo: Todo) => {
        if (status === Filter.Active && todo.completed) {
          return false;
        }

        if (status === Filter.Completed && !todo.completed) {
          return false;
        }

        return todo.title.toLocaleLowerCase().includes(lowerQuery);
      });
    },
    [query, status],
  );

  const visibleTodos = useMemo(
    () => filterTodos(allTodos),
    [allTodos, filterTodos],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!allTodos.length ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter
                    query={query}
                    status={status}
                    setQuery={handleQueryChange}
                    setStatus={handleStatusChange}
                  />
                </div>

                <div className="block">
                  <TodoList
                    selectedTodo={selectedTodo}
                    setCurrentTodo={setCurrentTodo}
                    todos={visibleTodos}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isCurrentTodo && <TodoModal />}
    </>
  );
};
