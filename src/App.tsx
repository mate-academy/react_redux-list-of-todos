import { useEffect, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todoFromServer => {
        dispatch(setTodos(todoFromServer));
      })
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

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
