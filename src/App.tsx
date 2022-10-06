import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todoActions } from './features/todos';

export const App: React.FC = () => {
  const dispath = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoadind, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todos => dispath(todoActions.add(todos)))
      .finally(() => setIsLoading(false));
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
              {isLoadind
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
