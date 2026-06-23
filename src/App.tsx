import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect } from 'react';

import { getTodos } from './api';
import { start, finish } from './features/loading';
import { set as setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.loading);

  useEffect(() => {
    dispatch(start());
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch todos:', error);
      })
      .finally(() => {
        dispatch(finish());
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

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
