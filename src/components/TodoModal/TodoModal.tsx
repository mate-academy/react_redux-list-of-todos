import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  currentTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const {
    userId,
    completed,
    title,
    id,
  } = currentTodo;
  const currentDispatch = useAppDispatch();

  const [user, setUser] = useState<User>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserFromServer = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  const displayModal = !isLoading && !isError && user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      ) }
      { displayModal ? (
        <div className={classNames(
          'modal-card',
          'notification',
          {
            'is-success': completed,
            'is-danger': !completed,
          },
        )}
        >
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>
            <button
              aria-label="close-modal-button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => currentDispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block has-text-dark" data-cy="modal-title">
              {title}
            </p>

            <p className="block has-text-dark" data-cy="modal-user">
              <strong className={classNames({
                'has-text-success': completed,
                'has-text-danger': !completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>

          </div>
        </div>
      ) : (
        <div className="modal-card notification is-danger">
          <header className="modal-card-head">
            <div className="modal-card-title">
              Error
            </div>
            <button
              aria-label="close-modal-button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => currentDispatch(actions.removeTodo())}
            />
          </header>

          <article className="modal-card-body">
            <p className="block has-text-dark has-text-weight-medium">
              The error has happened...
            </p>
          </article>
        </div>

      )}
    </div>
  );
};
