import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUser } from './api';
import { setTodos } from './features/todos';
import { RootState } from './app/store';
import { setUser } from './features/user';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .catch(error => alert(error.message))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setIsLoadingUser(true);

    getUser(currentTodo.userId)
      .then(u => dispatch(setUser(u)))
      .catch(error => alert(error.message))
      .finally(() => setIsLoadingUser(false));
  }, [currentTodo, dispatch]);

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

      {currentTodo && <TodoModal isLoading={isLoadingUser} />}
    </>
  );
};
