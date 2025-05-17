import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect, useState } from 'react';

import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const hasCurrentTodo = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    getTodos()
      .then(loadedTodos => dispatch(todosSlice.actions.setTodos(loadedTodos)))
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

      {hasCurrentTodo && <TodoModal />}
    </>
  );
};
