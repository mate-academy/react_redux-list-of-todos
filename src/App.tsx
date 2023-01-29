import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todoActions } from './features/todos';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTodosFromServer = async () => {
    try {
      setIsLoading(true);
      const result = await getTodos();

      dispatch(todoActions.setTodos(result));
    } catch (error: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
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
              {isLoading && <Loader />}

              {(!isLoading && !isError) && <TodoList />}

              {(!isLoading && isError) && (
                <Error>
                  Something went wrong
                </Error>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
