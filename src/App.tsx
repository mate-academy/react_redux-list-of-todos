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

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(res => {
        dispatch(todosActions.addTodos(res));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading
              ? <Loader />
              : (
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

      {!isLoading && currentTodo && <TodoModal /> }
    </>
  );
};
