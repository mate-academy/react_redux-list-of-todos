import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/store';
import { todosSlice } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todos => {
        dispatch(todosSlice.actions.setTodos(todos));
      })
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

      {currentTodo !== null && <TodoModal todo={currentTodo} />}
    </>
  );
};
