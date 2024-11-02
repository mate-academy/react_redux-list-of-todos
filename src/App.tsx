import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectCurrentTodo, setTodos } from './features';

export const App = () => {
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(selectCurrentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(response => {
        dispatch(setTodos(response));
      })
      .finally(() => {
        setIsLoading(false);
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

            <div className="block">{isloading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
