import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { cleanCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentTodo) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    getUser(currentTodo.userId)
      .then(us => {
        setUser(us);
      })
      .catch(() => {
        setUser(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

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
            onClick={() => dispatch(cleanCurrentTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo?.title || 'No todo selected'}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo && !currentTodo.completed ? (
              <strong className="has-text-danger">Planned</strong>
            ) : (
              <strong className="has-text-success">Done</strong>
            )}
            {user && (
              <>
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
