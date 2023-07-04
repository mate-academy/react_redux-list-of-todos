import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';
// import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const filters = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    dispatch(actions.setTodo(todosFromServer));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => todos.filter(({ title, completed }) => {
    const lowerTitle = title.toLowerCase();
    const lowerQuery = filters.query.toLowerCase().trim();
    const result = lowerTitle.includes(lowerQuery);

    switch (filters.status) {
      case Status.active:
        return result && !completed;
      case Status.completed:
        return result && completed;

      default:
        return result;
    }
  }), [todos, filters.query, filters.status]);

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
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    setIsLoading={setIsLoading}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <TodoModal
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};
