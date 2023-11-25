/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const modalTodo = useAppSelector(state => state.currentTodo);
  const allTodos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const handleLoadTodos = async () => {
    const todos = await getTodos();

    dispatch(await actions.loadTodos(todos));
  };

  useEffect(() => {
    handleLoadTodos();
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
              {allTodos.length > 0 ? <TodoList /> : <Loader /> }

            </div>
          </div>
        </div>
      </div>

      {modalTodo && <TodoModal />}
    </>
  );
};
