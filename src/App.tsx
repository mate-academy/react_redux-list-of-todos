import { FC, useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { selectCurrentTodo } from './features/currentTodo/currentTodoSelectors';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App: FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector(selectCurrentTodo);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(res => {
        dispatch(setTodos(res));
      })
      .finally(() => {
        setLoading(false);
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
              {loading && <Loader />}

              {!loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
