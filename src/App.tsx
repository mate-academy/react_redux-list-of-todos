/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [load, setLoad] = useState(false);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const setTodos = useCallback(
    (data: Todo[]) => dispatch(todosSlice.actions.setTodos(data)),
    [dispatch],
  );

  useEffect(() => {
    setLoad(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setLoad(false));
  }, [setTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{load ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
