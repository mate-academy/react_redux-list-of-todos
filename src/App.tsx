import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .finally(() => setIsLoading(false));
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
