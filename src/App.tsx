import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const isSelected = currentTodo !== null;

  const getTodosFromServer = async () => {
    setIsLoading(true);

    try {
      setErrorMessage('');
      let allTodos = await getTodos();

      switch (status) {
        case Status.ALL:
          break;

        case Status.ACTIVE:
          allTodos = allTodos.filter(todo => !todo.completed);
          break;

        case Status.COMPLETED:
          allTodos = allTodos.filter(todo => todo.completed);
          break;

        default:
          break;
      }

      const lowerQuery = query.toLowerCase();

      allTodos = allTodos.filter(todo => {
        const lowerTitle = todo.title.toLowerCase();

        return lowerTitle.includes(lowerQuery);
      });

      dispatch(todosActions.setTodos(allTodos));
    } catch (error) {
      setErrorMessage('Data loading error');
      throw new Error('Data loading error');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getTodosFromServer();
  }, [query, status]);

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
              {!isLoading && !errorMessage && <TodoList />}
              {!isLoading && errorMessage && (
                <p className="notification is-warning">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSelected && <TodoModal />}
    </>
  );
};
