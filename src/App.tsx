/* eslint-disable max-len */
import React, {
  useEffect, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FilterType } from './types/FilterType';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const fetchTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      dispatch(todosActions.setTodos(todosFromServer));
    } catch (error) {
      throw new Error('Error while loading todos');
    }
  }, []);

  const visibleTodos = useMemo(() => {
    let todosToFilter;

    switch (status) {
      case FilterType.All:
        todosToFilter = todos;
        break;

      case FilterType.Completed:
        todosToFilter = todos.filter(todo => todo.completed);
        break;

      case FilterType.Active:
        todosToFilter = todos.filter(todo => !todo.completed);
        break;

      default:
        todosToFilter = todos;
        break;
    }

    return todosToFilter.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, query, status]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
        />
      )}
    </>
  );
};
