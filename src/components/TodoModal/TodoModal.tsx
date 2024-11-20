import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  onClose: VoidFunction;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    getUser(todo.userId)
      .then(response => {
        setUser(response);
      })
      .catch(() => {
        setError('Failed to load user data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={handleClose}
        aria-label="Close modal"
      />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${todo.id}`}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          />
        </header>

        <div className="modal-card-body">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="has-text-danger">{error}</p>
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
