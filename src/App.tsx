/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';
import { Todo } from './types/Todo';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const savaAllTodo = (data: Todo[]) => {
    dispatch(todosActions.addTodos(data));
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(response => {
        savaAllTodo(response);
      })
      .finally(() => setLoading(false));
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
              {loading && <Loader />}
              <TodoList loading={loading} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
