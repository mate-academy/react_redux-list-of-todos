/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

const getPreparedData = (
  todos: Todo[],
  { query, status }: { query: string, status: Status },
) => {
  let filtered = todos;

  if (query) {
    filtered = filtered.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ));
  }

  switch (status) {
    case 'active':
      filtered = filtered.filter(todo => !todo.completed);
      break;

    case 'completed':
      filtered = filtered.filter(todo => todo.completed);
      break;

    default:
      return filtered;
  }

  return filtered;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const preparedTodos = getPreparedData(todos, filter);

  useEffect(() => {
    getTodos()
      .then((response) => dispatch(actions.setTodos(response)))
      .catch(() => {
        throw new Error('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

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
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={preparedTodos}
                    currentTodo={currentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
