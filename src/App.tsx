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
import { Todo } from './types/Todo';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  const setTodos = (todos: Todo[]) => {
    dispatch(todosActions.setTodos(todos));
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        throw new Error(error.message);
      })
      .finally(() => setLoading(false));
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
              <Loader isLoading={loading}>
                <TodoList />
              </Loader>
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
