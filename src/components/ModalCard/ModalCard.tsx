import React from 'react';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user: User;
  currentTodo: Todo;
  handleCloseModal: () => void;
};

export const ModalCard: React.FC<Props> = ({
  user,
  currentTodo,
  handleCloseModal,
}) => {
  const { id, title, completed } = currentTodo;
  const { name, email } = user;

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          {`Todo #${id}`}
        </div>

        <button
          aria-label="none"
          type="button"
          className="delete"
          data-cy="modal-close"
          onClick={handleCloseModal}
        />
      </header>

      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">{title}</p>

        <p className="block" data-cy="modal-user">

          { completed ? (
            <strong className="has-text-success">Done</strong>
          ) : (
            <strong className="has-text-danger">Planned</strong>
          )}

          {' by '}
          <a href={`mailto:${email}`}>{name}</a>
        </p>
      </div>
    </div>
  );
};
