/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
// import { Todo } from './types/Todo';
import { useAppDispatch } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Loader } from './components/Loader';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const loadTodos = async () => {
    try {
      const todoData = await getTodos();

      dispatch(todosActions.setTodos(todoData));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error');
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
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
