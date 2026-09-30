import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error: todosError } = useAppSelector(state => state.todos);
  const userError = useAppSelector(state => state.currentTodo.error);
  const error = todosError || userError;

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {error && <div className="notification is-danger">{error}</div>}

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
