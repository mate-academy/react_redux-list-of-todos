import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useEffect } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './features/todos';
import { RootState } from './app/store';
import { Todo } from './types/Todo';

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      try {
        const todosFromServer = await getTodos();

        dispatch(setTodos(todosFromServer));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
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

      {currentTodo && <TodoModal />}
    </>
  );
};
