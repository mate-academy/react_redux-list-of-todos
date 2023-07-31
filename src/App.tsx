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
import { SortType } from './types/SortType';

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
    let filteredTodos = [...todos];

    switch (filterState.status) {
      case SortType.ACTIVE:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case SortType.COMPLETED:
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (filterState.query) {
      const lowerCaseQuery = filterState.query.toLowerCase();

      filteredTodos = filteredTodos
        .filter(todo => todo.title.toLowerCase().includes(lowerCaseQuery));
    }

    return filteredTodos;
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
                // selectTodo={selectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectTodo && <TodoModal />}
    </>
  );
};
