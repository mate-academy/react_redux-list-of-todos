import React, {
  useState,
  useEffect,
} from 'react';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

import {
  TodoList,
  TodoFilter,
  TodoModal,
  Loader,
} from './components';
import { getTodos } from './api';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((todosFromServer) => dispatch(actions.setTodos(todosFromServer)))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
