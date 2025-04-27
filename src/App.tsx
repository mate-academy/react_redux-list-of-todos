import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { AppDispatch, RootState } from './app/store';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currTodos = useSelector(
    (state: RootState) => state.currentTodo,
  ) as Todo | null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const todoData = await getTodos();

        dispatch(todosSlice.actions.todos(todoData));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
              {isLoading && !isError ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currTodos && <TodoModal />}
    </>
  );
};
