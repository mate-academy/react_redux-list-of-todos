import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from './features/todos';
import { RootState } from './app/store';

export const App = () => {
  const dispatch = useDispatch();
  const [todosError, setTodosError] = useState(false);
  const [todosLoader, setTodosLoader] = useState(false);
  const todos = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setTodosLoader(true);

    getTodos()
      .then(response => {
        dispatch(initialize(response));
      })
      .catch(() => {
        setTodosError(true);
      })
      .finally(() => {
        setTodosLoader(false);
      });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">{todos && <TodoFilter />}</div>

            <div className="block">
              {todosLoader && !todosError && <Loader />}
              {todos && !todosError && !todosLoader && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
