import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  activeTodo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ activeTodo, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User | null>(null);

  const { id, completed, title, userId } = activeTodo;

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then(userData => setData(userData))
      .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading || !data ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
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
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {!completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${data?.email}`}>{data?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
