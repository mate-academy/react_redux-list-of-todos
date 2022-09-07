import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { store } from './app/store';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { actions as loadingActions } from './features/loading';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { pageLoading } = useAppSelector(state => state.loading);
  const { setTodos } = todosActions;

  useEffect(() => {
    getTodos()
      .then(res => {
        store.dispatch(setTodos(res));
        store.dispatch(loadingActions.setPageIsNOTLoading());
      })
      .catch(() => {
        throw new Error();
      });
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
              {pageLoading ? (
                <Loader />
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
