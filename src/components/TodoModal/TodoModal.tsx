import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';

type Props = {
  userId: number,
  handleClose: () => void,
};

export const TodoModal: React.FC<Props> = ({ userId, handleClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getUser(userId)
      .then(selectedUserId => setUser(selectedUserId));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(user && currentTodo) ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              aria-label="none"
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
              {!currentTodo.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (<Loader />)}
    </div>
  );
};
