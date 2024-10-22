import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => {
        alert('error loading todos');
      })
      .finally(() => setIsLoading(false));
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
