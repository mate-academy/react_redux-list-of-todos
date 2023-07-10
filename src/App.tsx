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

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filterState = useAppSelector(state => state.filter);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const todosFromServer = await getTodos();

        dispatch(actionTodos.SetAdd(todosFromServer));
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = [...todos];

    switch (filterState.status) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} errorMessage={errorMessage} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal />
      )}
    </>
  );
};
