/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todoAction } from './features/todos';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadTodos = useCallback(async () => {
    try {
      const loadedTodos = await getTodos();

      dispatch(todoAction.setTodos(loadedTodos));
      setLoader(false);
    } catch {
      // handleErrorSet(ErrMessage.loadTodo);
    }
  }, []);

  useEffect(() => {
    setLoader(true);
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

            <div className="block">{loader ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
