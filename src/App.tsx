import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { loadTodos, setLoading } from './features/todos';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.todos.isLoading);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalLoader, setModalLoader] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setLoading(true));

    getTodos()
      .then(todos => {
        dispatch(loadTodos(todos));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load todos:', error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);
      setModalLoader(false);

      return;
    }

    setModalLoader(true);

    getUser(selectedTodo.userId)
      .then(response => {
        setSelectedUser(response);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load user:', error);
      })
      .finally(() => {
        setModalLoader(false);
      });
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {' '}
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal user={selectedUser} modalLoader={modalLoader} />
      )}
    </>
  );
};
