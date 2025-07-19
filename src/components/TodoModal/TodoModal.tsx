import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo;
  onClose: () => void;
  user: User | null;
  loading: boolean;
  error: string;
  onRetry: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onClose,
  user,
  loading,
  error,
  onRetry,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="modal-card">
          <div
            className={`
                modal-card-body
                is-flex
                is-flex-direction-column
                is-justify-content-center
                is-align-items-center
              `}
          >
            <button className="button is-medium" onClick={onRetry}>
              <span>Retry</span>
            </button>
            <div>Error details: {error}</div>
          </div>
        </div>
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {user && (
                <>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
