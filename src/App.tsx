/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actionsTodos } from './features/todos';
import { actionsFilter } from './features/filter';
import { useAppSelector } from './app/hooks';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { actions } from './features/currentTodo';

enum FilterTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const filters = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const handleFilter = (status: Status, query: string) => {
    dispatch(actionsFilter.filter(status, query));
  };

  const handleClearQuery = (status: Status) => {
    dispatch(actionsFilter.clear(status));
  };

  const handleCurrentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const removeCurrentTodo = () => {
    dispatch(actions.removeTodo());
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const todoData = await getTodos();

        dispatch(actionsTodos.addTodos(todoData));
      } catch {
        throw new Error('Failed to fetch todos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const lowerCaseQuery = filters.query.toLowerCase();
      const lowerCaseTitle = todo.title.toLowerCase();

      return lowerCaseTitle.includes(lowerCaseQuery)
      && (filters.status === FilterTypes.All
          || (filters.status === FilterTypes.Active && !todo.completed)
          || (filters.status === FilterTypes.Completed && todo.completed));
    });
  }, [todos, filters.query, filters.status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilter={handleFilter}
                filters={filters}
                handleClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : (
                <TodoList
                  todos={filteredTodos}
                  handleCurrentTodo={handleCurrentTodo}
                  currentTodo={currentTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && (
        <TodoModal
          currentTodo={currentTodo}
          removeCurrentTodo={removeCurrentTodo}
        />
      )}
    </>
  );
};
