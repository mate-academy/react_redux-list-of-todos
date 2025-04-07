import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { User } from '../../types/User';

import { useAppSelector } from '../../hooks/useAppSelector';
import { clearCurrentTodo } from '../../features/currentTodo';

import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const todo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(clearCurrentTodo());
  };

  useEffect(() => {
    setIsLoading(true);

    if (todo?.userId) {
      getUser(todo.userId)
        .then(setUser)
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && todo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>
            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
