import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getUser(currentTodo?.userId || 0)
      .then((data) => {
        setError('');
        setUser(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentTodo?.userId]);

  const showUser = !isLoading && error === '' && user !== null;
  const showEmpty = !isLoading && error === '' && user === null;
  const showError = !isLoading && error !== '';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoActions.removeTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {showUser && (
                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              )}

              {showEmpty && (
                <p>User not found</p>
              )}

              {showError && (
                <p className="has-text-danger">
                  {error}
                </p>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
