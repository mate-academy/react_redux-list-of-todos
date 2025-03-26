import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(data => {
      dispatch(setTodos(data));
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

            <div className="block">
              {isLoading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
