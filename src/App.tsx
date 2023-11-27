/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchTodos } from './features/todos';

export const App: React.FC = () => {
  const selectedTodos = useAppSelector((state) => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  // any ze wzgl na konflikty w nazwach
  const todos = useAppSelector((state: any) => state.todos.todos);

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
              {(todos?.length > 0)
                ? <TodoList todos={todos} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodos && <TodoModal />}
    </>
  );
};
