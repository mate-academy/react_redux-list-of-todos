import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    } else {
      setUser(null);
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const handleClose = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo.id}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
          />
        </header>

        <div className="modal-card-body" style={{ minHeight: '150px' }}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {user && (
                  <>
                    {' by '}
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
