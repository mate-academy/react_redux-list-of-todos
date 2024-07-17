import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';
import { TodoFilter, TodoList, TodoModal } from './components';
import { actions as todosActions } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const fetchTodos = useCallback(() => {
    dispatch(todosActions.setLoading(true));

    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.loadTodos(todosFromServer));
      })
      .catch(() => {
        dispatch(todosActions.setError('Something went error'));
      })
      .finally(() => {
        dispatch(todosActions.setLoading(false));
      });
  }, [dispatch]);

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
              <TodoList onOpenModal={handleOpenModal} showModal={showModal} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal showModal={showModal} onCloseModal={handleCloseModal} />
    </>
  );
};
