import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  currentTodo: Todo;
  onRemoveTodo: (todo: Todo) => void;
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  onRemoveTodo,
}) => {
  const {
    userId, id, title, completed,
  } = currentTodo;

  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getUser(userId)
      .then((response) => setUser(response))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleCloseModal = () => {
    onRemoveTodo(currentTodo);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}
      {!hasError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({ 'has-text-danger': !completed },
                { 'has-text-success': completed })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user && user.email}`}>{user && user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
