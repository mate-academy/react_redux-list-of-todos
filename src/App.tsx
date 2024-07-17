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
  const [loadingTodo, setLoadingTodo] = useState(false);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const fetchTodos = useCallback(async () => {
    setLoadingTodos(true);

    return getTodos()
      .then(todos => {
        dispatch(loadTodos(todos));

        setLoadingTodos(false);
      })
      .catch(() => {
        setErrorFetch('Error for fetch todos');
      });
  }, [dispatch]);

  const getUserById = async (userId: number): Promise<User> => {
    setLoadingTodo(true);

    return getUser(userId).then(user => {
      setLoadingTodo(false);

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
              {loadingTodos && <Loader />}
              <TodoList
                getUserById={getUserById}
                onOpenModal={handleOpenModal}
                errorFetch={errorFetch}
                loading={loadingTodos}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        loading={loadingTodo}
        showModal={showModal}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};
