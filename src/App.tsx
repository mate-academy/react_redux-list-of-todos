import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(res => {
        dispatch(todosSlice.actions.setTodos(res));
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('Error');
      })
      .finally(() => {
        setIsLoading(false);
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
              {isLoading && <Loader />}
              <TodoList isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
