/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export enum FilterBy {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  QUERY = 'byQuery',
}

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [todoIsLoaded, setTodoisLoaded] = useState(false);

  const loadTodos = async () => {
    try {
      setTodoisLoaded(false);
      const todosFromServer = await getTodos();

      dispatch(todosActions.set(todosFromServer));
    } finally {
      setTodoisLoaded(true);
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
              {!todoIsLoaded
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo
        && (
          <TodoModal />
        )}
    </>
  );
};
