/* eslint-disable max-len */
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
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector((state) => state.currentTodo);

  const loadData = async () => {
    try {
      setIsLoading(true);

      const loadedData = await getTodos();

      dispatch(todosActions.setTodoAction(loadedData));

      setIsDataLoaded(true);
      setIsLoading(false);
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error');
    }
  };

  useEffect(() => {
    loadData();
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

              {isDataLoaded && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
