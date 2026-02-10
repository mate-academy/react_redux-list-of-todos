import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';

export const App = () => {
  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoader(true);
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch (error) {
        throw new Error('error');
      } finally {
        setIsLoader(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          {isLoader ? (
            <Loader />
          ) : (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
              </div>
            </div>
          )}
        </div>
      </div>
      {currentTodo && currentTodo.todo && <TodoModal />}
    </>
  );
};
