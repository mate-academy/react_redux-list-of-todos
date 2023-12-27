/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
// import { TodoModal } from './components/TodoModal';
import { useAppDispatch } from './app/hooks';
import { addTodos } from './features/todos';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todosData: Todo[]) => {
        dispatch(addTodos(todosData));
      })
      .finally(() => {
        setLoading(false);
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
              {loading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
