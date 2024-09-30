import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface TodoModalProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  };
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (todo) {
      setLoading(true);
      getUser(todo.userId)
        .then(userData => {
          setUser(userData);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [todo]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
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
            {user ? (
              <a href={`mailto:${user.email}`}>{user.name}</a>
            ) : (
              'Loading user...'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
