import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const loadUser = async (userId: number) => {
    try {
      setIsLoading(true);

      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentTodo) {
      loadUser(currentTodo.userId);
    }
  }, []);

  const handleModalClose = () => dispatch(currentTodoActions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {hasError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="
                modal-card-title
                has-text-weight-medium
                has-text-danger
              "
            >
              Error
            </div>

            <button
              type="button"
              aria-label="Close this window"
              className="delete"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block has-text-danger">
              Error occured while loading user info.
            </p>
          </div>
        </div>
      )}

      {(user && currentTodo) && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              aria-label="Close this window"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
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
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
