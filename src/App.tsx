import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hook';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { setTodos } from './features/todos';
import { useDispatch } from 'react-redux';
import { User } from './types/User';

export const App = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [dispatch]);

  const [user, setUser] = useState<User | null>();
  const [loadingTodoModal, setLoadingTodoModal] = useState(false);

  useEffect(() => {
    setLoadingTodoModal(true);

    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId)
      .then(setUser)
      .catch(() => {})
      .finally(() => {
        setLoadingTodoModal(false);
      });
  }, [currentTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          {loading ? (
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

      {currentTodo ? (
        <TodoModal
          user={user}
          setUser={setUser}
          loadingTodoModal={loadingTodoModal}
        />
      ) : null}
    </>
  );
};
