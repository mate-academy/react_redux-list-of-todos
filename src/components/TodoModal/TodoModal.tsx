import React from 'react';
import { Loader } from '../Loader';

interface Props {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  } | null;
  user: {
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  onClose: () => void;
}

// eslint-disable-next-line max-len
export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isLoading,
  onClose,
}) => {
  if (!todo) {
    return null; // Якщо завдання не вибране, модальне вікно не відображається
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {isLoading ? (
        <Loader />
      ) : (
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
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`malito:${user.email}`}>{user.name}</a>
              ) : (
                'Unknown user'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
