import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import cn from 'classnames';

type Props = {
  todoTitle: string;
  userId: number;
  todoId: number;
  isOpen: boolean;
  onClose: () => void;
  completed: boolean;
};

export const TodoModal: React.FC<Props> = ({
  todoTitle,
  userId,
  todoId,
  isOpen,
  onClose,
  completed,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedUser(null);
    setErrorMessage('');
    setIsUserLoading(true);
    getUser(userId)
      .then(data => {
        setSelectedUser(data);
      })
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setIsUserLoading(false));
  }, [isOpen, userId]);

  const modalClass = cn('modal', { 'is-active': isOpen });

  return (
    <div className={modalClass} data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {isUserLoading && <Loader />}

      {!isUserLoading && !errorMessage && selectedUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoTitle}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={completed ? 'has-text-success' : 'has-text-danger'}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
