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
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, currentTodo, filter } = useAppSelector(store => store);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTodos = getFilteredTodos(todos, filter);

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

              {!isLoading && (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
