import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hooks';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface IProps {
  todo: Todo;
}

export const TodoModal: React.FC<IProps> = ({
  todo: {
    id, title, completed, userId,
  },
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } catch {
        setHasLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const closeModal = () => dispatch(currentTodoActions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {hasLoadingError && <p>There was an error while loading the user</p>}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              <strong
                className={clsx({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
