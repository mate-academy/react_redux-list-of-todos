/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoadTodos, setIsLoadTodos] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const loadTodos = async () => {
    try {
      setIsLoadTodos(true);
      const todosFromServer = await getTodos();

      dispatch(todosActions.set(todosFromServer));
    } finally {
      setIsLoadTodos(false);
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
              {isLoadTodos
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (<TodoModal />)}
    </>
  );
};
