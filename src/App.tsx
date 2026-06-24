/* eslint-disable prettier/prettier */

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';
import { setTodos } from './features/todos';
import { startLoading, stopLoading } from './features/loading';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoading());

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load todos:', error);
      })
      .finally(() => {
        dispatch(stopLoading());
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
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
