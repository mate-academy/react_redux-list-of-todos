import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { ErrorModal } from './components/ErrorModal/ErrorModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector<Todo | null>(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage('Request timed out');
      setIsLoading(false);
    }, 3000);

    getTodos()
      .then(data => dispatch(todosActions.setTodos(data)))
      .catch(error => setErrorMessage(`Error fetching todos data. ${error}`))
      .finally(() => {
        clearTimeout(timeoutId);
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          updateErrorMessage={(error: string) => setErrorMessage(error)}
        />
      )}

      {errorMessage && <ErrorModal message={errorMessage} />}
    </>
  );
};
