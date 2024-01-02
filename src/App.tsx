/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadedTodos = useAppSelector((state) => state.todos);
  const openedTodo = useAppSelector((state) => state.currentTodo);

  const handleLoadTodos = async () => {
    const todos = await getTodos();

    dispatch(todosActions.loadTodos(todos));
  };

  useEffect(() => {
    handleLoadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              { loadedTodos.length > 0 ? <TodoList /> : <Loader /> }
            </div>
          </div>
        </div>
      </div>

      {openedTodo && <TodoModal />}
    </>
  );
};
