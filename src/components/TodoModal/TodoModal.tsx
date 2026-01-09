import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(null);

    getUser(todo.userId).then(userData => {
      setUser(userData);
    });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
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

              <a href={`mailto:${user?.email}`}>
                {user?.name || 'Unknown user'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
