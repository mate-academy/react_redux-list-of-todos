import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null,
  user: User,
  closeModalTodo: () => void,
};

export const TodoModalCard: React.FC<Props> = ({
  todo,
  user,
  closeModalTodo,
}) => {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          {`Todo #${todo?.id}`}
        </div>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="delete"
          data-cy="modal-close"
          onClick={closeModalTodo}
        />
      </header>

      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">
          {todo?.title}
        </p>

        <p className="block" data-cy="modal-user">
          { todo?.completed
            ? <strong className="has-text-success">Done</strong>
            : <strong className="has-text-danger">Planned</strong>}

          <a href={`mailto:${user.email}`}>
            {` by ${user.name}`}
          </a>
        </p>
      </div>
    </div>
  );
};
