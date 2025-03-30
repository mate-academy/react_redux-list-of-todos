import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { actions } from './features/todos';
import { useAppSelector } from './hooks/useAppSelector';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(sa => sa.currentTodo);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(res => dispatch(actions.addTodos(res)))
      .catch(() => {
        throw new Error('Failed to get a server response');
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">{!loading && <TodoFilter />}</div>

            <div className="block">
              {loading && <Loader />}
              {!loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
