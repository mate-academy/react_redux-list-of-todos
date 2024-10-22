import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);
      getUser(currentTodo?.userId)
        .then(setCurrentUser)
        .catch(() => {
          alert('error loading user');
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setCurrentTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
