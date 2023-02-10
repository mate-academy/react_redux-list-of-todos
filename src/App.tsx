/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromServer = await getTodos();

      dispatch(todosActions.setTodos(todosFromServer));
    };

    fetchTodos();
  }, []);

  const lowerQuery = query.toLowerCase();

  const getVisibleTodos = () => {
    return todos.filter(todo => {
      if ((status === 'active' && todo.completed) || (status === 'completed' && !todo.completed)) {
        return false;
      }

      return todo.title.toLowerCase().includes(lowerQuery);
    });
  };

  const visibleTodos = useMemo(getVisibleTodos, [todos, status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
        />
      )}
    </>
  );
};
