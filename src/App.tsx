/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/todos';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodoState = useAppSelector((state) => state.currentTodo);
  const todosState = useAppSelector((state) => state.todos);
  const filterState = useAppSelector((state) => state.filter);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        dispatch(actionsTodos.setTodo(loadedTodos));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = [...todosState];

    switch (filterState.status) {
      case SortType.ALL:
        filteredTodos = todosState;
        break;

      case SortType.ACTIVE:
        filteredTodos = todosState.filter(todo => !todo.completed);
        break;

      case SortType.COMPLETED:
        filteredTodos = todosState.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = todosState;
        break;
    }

    return filteredTodos.filter(todo => todo.title.toLowerCase().includes(filterState.query.toLowerCase()));
  }, [todosState, filterState]);

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
                : <TodoList todos={visibleTodos} />}

              {isError && (
                <p className="notification is-warning">
                  Todos can not be loaded from the server.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodoState && <TodoModal />}
    </>
  );
};
