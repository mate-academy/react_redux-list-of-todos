import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as todoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [isLoadingError, setIsLoadingError] = useState(false);

  const {
    id,
    title,
    completed,
    userId,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = currentTodo!;

  const loadingUserData = async () => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
      setIsLoadingError(false);
    } catch {
      setIsLoadingError(true);
    }
  };

  useEffect(() => {
    loadingUserData();
  }, []);

  const isLoading = !user && !isLoadingError;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading
        ? <Loader />
        : (
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
                onClick={() => dispatch(todoActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {' by '}
                {!isLoadingError
                  ? <a href={`mailto:${user?.email}`}>{user?.name}</a>
                  : (
                    <p
                      className="notification is-warning"
                    >
                      Can`t load user from server
                    </p>
                  )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
