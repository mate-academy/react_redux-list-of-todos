import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { todosSlice } from './features/todos';
import { RootState } from './app/store';
import { User } from './types/User';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getTodos().then(data => {
      dispatch(todosSlice.actions.setTodos(data));
      setIsLoading(false);
    });
  }, [dispatch]);
  const Todo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    if (!Todo) {
      return;
    }

    setIsLoading(true);
    getUser(Todo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [Todo]);

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
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {Todo && <TodoModal user={user} isLoading={isLoading} />}
    </>
  );
};
