/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

import { actions as currentTodoActions } from './features/currentTodo';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

const getVisibleTodos = (
  todos: Todo[],
  filter: { query: string, status: Status },
): Todo[] => {
  const { query, status } = filter;
  let filtered = [...todos];

  switch (status) {
    case 'active':
      filtered = filtered.filter(todo => !todo.completed);
      break;

    case 'completed':
      filtered = filtered.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return filtered.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(todosActions.set(todosFromServer));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getTodosFromServer();
  }, []);

  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <>
      <div className="columns is-flex is-justify-content-center">
        <div className="column is-two-thirds m-6">
          <div className="panel is-info">
            <h1 className="title panel-heading">Todos:</h1>

            <div className="panel-block is-flex is-justify-content-center">
              <TodoFilter />
            </div>

            <div className="panel-block is-flex is-justify-content-center">
              {!isLoading
                ? (
                  <TodoList
                    todos={visibleTodos}
                  />
                )
                : <Loader />}
            </div>
            {isError && (
              <p>Something went wrong...</p>
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} onClose={() => dispatch(currentTodoActions.removeTodo())} />
      )}
    </>
  );
};
