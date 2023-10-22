import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

const ERROR_MESSAGE = 'Failed to load the todos, try again later';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => dispatch(todosActions.load(todosFromServer)))
      .catch(() => setError(ERROR_MESSAGE))
      .finally(() => setIsLoading(false));
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
              { isLoading && <Loader /> }
              { (!isLoading && !error) && <TodoList /> }
              { error && (
                <span style={{ color: 'red' }}>{error}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      { currentTodo && <TodoModal /> }
    </>
  );
};
