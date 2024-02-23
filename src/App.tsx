/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getTodos().then(todosItems => {
      dispatch(todosActions.SetTodos(todosItems));
      setIsLoading(false);
    });
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
              {isLoading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
