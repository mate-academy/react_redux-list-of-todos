import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Error } from '../Error';

import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo,
  onClose: () => void,
};

export const TodoModal: FC<Props> = ({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const {
    id,
    title,
    userId,
    completed,
  } = selectedTodo;

  useEffect(() => {
    const loadUser = async () => {
      setIsUserLoading(true);

      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } catch {
        setHasUserError(true);
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUser();
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              aria-label="close"
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

            {user && (
              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {completed
                    ? 'Done'
                    : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {hasUserError && (
        <Error />
      )}
    </div>
  );
};
