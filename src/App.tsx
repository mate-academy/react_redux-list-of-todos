import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    async function loadTodos() {
      const data = await getTodos();

      dispatch(todosSlice.actions.setTodos(data));
      setIsLoading(false);
    }

    loadTodos();
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
      {todo && <TodoModal />}
    </>
  );
};
