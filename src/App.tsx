import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import { setTodos } from './features/todos';
import { getTodos } from './api';

import { Loader } from './components/Loader/Loader';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoModal } from './components/TodoModal/TodoModal';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  useEffect(() => {
    let isActive = true;

    setIsLoadingTodos(true);

    getTodos()
      .then(data => {
        if (isActive) {
          dispatch(setTodos(data));
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingTodos(false);
        }
      });

    return () => {
      isActive = false;
    };
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
              {isLoadingTodos ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
