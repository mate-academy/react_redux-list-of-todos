import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setLoadingTodo, setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const loading = useAppSelector(state => state.todos.loading);

  useEffect(() => {
    dispatch(setLoadingTodo(true));

    getTodos()
      .then(todo => dispatch(setTodos(todo)))
      .catch(() => {
        dispatch(setLoadingTodo(false));
      });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">{!loading && <TodoList />}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
