import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

const ModalLoader = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setUser(null);
      setIsLoadingUser(true);
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setIsLoadingUser(false));
    } else {
      setUser(null);
    }
  }, [currentTodo]);

  const handleClose = () => {
    dispatch(clearCurrentTodo());
  };

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />
      {isLoadingUser && <ModalLoader />}
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo.id}
          </div>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo.completed ? (
              <>
                <strong className="has-text-success">Done</strong>
                {' by '}
                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </>
            ) : (
              <strong className="has-text-danger">
                Planned{user ? ` by ${user.name}` : ''}
              </strong>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
