import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch } from './app/hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    getTodos().then(todos => {
      dispatch(setTodos(todos));
      setIsloading(false);
    });
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
              {/* <Loader /> */}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
