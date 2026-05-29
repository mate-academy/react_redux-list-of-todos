/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeModal } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const modalTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!modalTodo) {
      return;
    }

    setIsLoading(true);
    setUser(null);
    setUserError('');

    getUser(modalTodo.userId)
      .then(fetchedUser => setUser(fetchedUser))
      .catch(() => setUserError('User loading failed'))
      .finally(() => setIsLoading(false));
  }, [modalTodo]);

  if (!modalTodo) {
    return null;
  }

  function handleModalClose() {
    dispatch(closeModal());
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleModalClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{modalTodo.id}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleModalClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {modalTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {modalTodo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}

            <span data-cy="modal-author">
  {isLoading && <Loader />}

  {userError && <span className="has-text-danger">{userError}</span>}
  {user && (
    <a href={`mailto:${user.email}`}>
      {user.name}
    </a>
  )}
</span>
          </p>
        </div>
      </div>
    </div>
  );
};
