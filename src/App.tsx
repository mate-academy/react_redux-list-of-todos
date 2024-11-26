import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/store';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { isSelected } from './features/currentTodo';

export const App = () => {
  const todoModal = useAppSelector(isSelected);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(resp => dispatch(todosSlice.actions.setTodos(resp)))
      .catch()
      .finally(() => setIsLoading(false));
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
      {todoModal && <TodoModal />}
    </>
  );
};
