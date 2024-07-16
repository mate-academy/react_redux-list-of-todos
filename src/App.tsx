import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { useCallback, useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { useAppDispatch } from './app/hooks';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { loadTodos } from './features/todos';
import { User } from './types/User';

export const App = () => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [errorFetch, setErrorFetch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    return getTodos()
      .then(todos => {
        dispatch(loadTodos(todos));
      })
      .catch(() => {
        setErrorFetch('Error for fetch todos');
      });
  }, [dispatch]);

  const getUserById = async (userId: number): Promise<User> => {
    setLoading(true);

    return getUser(userId).then(user => {
      setLoading(false);

      return user;
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
              {false && <Loader />}
              <TodoList
                getUserById={getUserById}
                onOpenModal={handleOpenModal}
                errorFetch={errorFetch}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        loading={loading}
        showModal={showModal}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};
