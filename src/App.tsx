/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosActions } from './features/todos';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .catch()
      .finally(() => {
        setIsTodosLoading(false);
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
              {isTodosLoading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
