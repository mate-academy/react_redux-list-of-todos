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
import { actions as actionTodos } from './features/todos';
import { SortingType } from './types/sortingType';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectTodo = useAppSelector((state) => state.currentTodo);
  const todos = useAppSelector((state) => state.todos);
  const filterState = useAppSelector((state) => state.filter);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        dispatch(actionTodos.SetAdd(loadedTodos));
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }

        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filterState.status) {
      case SortingType.ALL:
        return todos?.filter(todo => todo.title.includes(filterState.query));

      case SortingType.ACTIVE:
        return todos.filter(todo => !todo.completed
          && todo.title.includes(filterState.query));

      case SortingType.COMPLETED:
        return todos.filter(todo => todo.completed
          && todo.title.includes(filterState.query));

      default:
        return todos;
    }
  }, [todos, filterState]);

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
              {isLoading && <Loader />}
              <TodoList
                errorMessage={errorMessage}
                todos={visibleTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {selectTodo && <TodoModal />}
    </>
  );
};
