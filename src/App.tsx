import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';
import { actions as filterActions } from './features/filter';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { latestTodos } = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTodos();

        dispatch(todosActions.addTodos(response));
      } catch (fetchError) {
        throw new Error(`Data could not be fetched: ${fetchError}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.changeStatus(event.target.value as Status));
  };

  function filterStatus(value: string): Todo[] | null {
    switch (value) {
      case Status.All:
        return latestTodos;

      case Status.Active:
        return latestTodos.filter(todo => !todo.completed);

      case Status.Completed:
        return latestTodos.filter(todo => todo.completed);

      default:
        return null;
    }
  }

  const visibleTodos = filterStatus(status)?.filter(
    todo => todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                todoStatus={handleStatusChange}
                query={query}
                onSelect={(value) => dispatch(filterActions.changeQuery(value))}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          userId={selectedTodo.userId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
