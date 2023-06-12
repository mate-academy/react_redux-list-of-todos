import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../app/hooks';
import { actions as TodoAction } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  currentTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const [isLoading, setLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const {
    id,
    userId,
    completed,
    title,
  } = currentTodo;

  const getUserFromServer = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } finally {
      setLoaded(false);
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              aria-label="Mute volume"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(TodoAction.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-success': completed,
                'has-text-danger': !completed,
              })}
              >
                {completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
