//import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type TodoModalProp = {
  completed?: boolean;
  userName?: string;
  todo?: Todo | null;
  userEmail?: string;
  isLoading?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TodoModal: React.FC<TodoModalProp> = ({
  completed,
  userName,
  userEmail,
  todo,
  isLoading,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {todo && `Todo #${todo.id}`}
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
              {todo ? todo.title : ''}
            </p>

            <p className="block" data-cy="modal-user">
              {completed && <strong className="has-text-success">Done</strong>}
              {!completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a
                href={userEmail ? `mailto:${userEmail}` : '#'}
                data-cy="modal-user-email"
              >
                {userName}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
