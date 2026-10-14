import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { AppDispatch } from './app/store';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos().then(todos => {
      dispatch(setTodos(todos));
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
