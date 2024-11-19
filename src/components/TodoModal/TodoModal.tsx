import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface ModalProps {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<ModalProps> = ({ todo, onClose }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setModalLoading(true);

    getUser(todo?.userId)
      .then((loadedUser: User) => {
        setUser(loadedUser);
      })
      .finally(() => {
        setModalLoading(false);
      });
  }, [todo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

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
          {modalLoading ? (
            <Loader />
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

                {user ? (
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                ) : (
                  'Unknown User'
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
