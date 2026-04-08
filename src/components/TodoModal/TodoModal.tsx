import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    if (currentTodo) {
      setUser(null);
      setIsLoading(true);
      setIsError(false);

      getUser(currentTodo.userId)
        .then(fetchedUser => setUser(fetchedUser))
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(clearCurrentTodo())}
      />

      {isLoading && <Loader />}
      {!isLoading && isError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium">Error</div>
            <button
              type="button"
              className="delete"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>
          <div className="modal-card-body">
            <p className="notification is-danger">Failed to load user data</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>
          </header>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(clearCurrentTodo())}
          />
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {currentTodo.completed === false ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
