import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { setTodos } from './features/todos';
import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .finally(() => setLoading(false));
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

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
