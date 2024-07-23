import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { add } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentItem = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        dispatch(add(data));
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
              {loading && <Loader />}
              {!loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentItem && <TodoModal />}
    </>
  );
};
