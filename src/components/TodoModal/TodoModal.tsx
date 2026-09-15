import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  currentTodo: Todo;
  onClose: () => void;
}

export const TodoModal = ({ currentTodo, onClose }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setHasError(false);
        setIsLoading(true);

        const response = await getUser(currentTodo.userId);

        setUser(response);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setHasError(true);
      }
    };

    fetchUser();
  }, [currentTodo.userId]);

  let content: React.ReactNode = null;

  if (isLoading) {
    content = <Loader />;
  } else if (hasError) {
    content = <p>Something went wrong</p>;
  } else {
    content = (
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo.id}
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
            {currentTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {content}
    </div>
  );
};
