import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';

import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { setTodos } from './features/todos';

export const App = () => {
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then((response: Todo[]) => {
        dispatch(setTodos(response));
      })
      .catch(() => {
        throw new Error("Can't get todos");
      })
      .finally(() => setIsLoadingTodos(false));
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
