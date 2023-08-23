/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const todosFromServer = await getTodos();

      dispatch(todosActions.setTodos(todosFromServer));
    } catch (error) {
      setErrorMessage('Unable to load todos');
      clearError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

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
              {isLoading && (
                <Loader />
              )}
              {!!todos.length && (
                <TodoList />
              )}
              {errorMessage && (
                <Error errorMessage={errorMessage} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (<TodoModal />)}
    </>
  );
};
