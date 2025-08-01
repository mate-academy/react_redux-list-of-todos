import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  // const userId = currentTodo?.userId;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (!currentTodo?.userId) {
      setIsLoading(false);

      return;
    }

    const timer = setTimeout(() => {
      getUser(currentTodo.userId)
        .then(setUser)
        // eslint-disable-next-line no-console
        .catch(error => console.error('Error loading user:', error))
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [currentTodo?.userId]);

  if (!currentTodo) {
    return null;
  }

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
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title.charAt(0).toUpperCase() +
                currentTodo.title.slice(1)}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {/* For completed */}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
