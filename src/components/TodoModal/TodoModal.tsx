import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import '../Loader/Loader.scss';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo.todo);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const closeModal = () => {
    dispatch(clearCurrentTodo());
  };

  useEffect(() => {
    if (currentTodo) {
      setUser(null);
      setIsLoadingUser(true);
      getUser(currentTodo.userId)
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          // Handle error silently - could show user notification
        })
        .finally(() => {
          setIsLoadingUser(false);
        });
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={closeModal} />

      <div className="modal-card">
        {isLoadingUser && (
          <div className="Loader" data-cy="loader">
            <div className="Loader__content" />
          </div>
        )}
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
            aria-label="Close modal"
            onClick={closeModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo.completed ? (
              <>
                <strong className="has-text-success">Done</strong>
                {' by '}
                <a
                  href={`mailto:${user?.email || `user${currentTodo.userId}@april.biz`}`}
                >
                  {user?.name || `User ${currentTodo.userId}`}
                </a>
              </>
            ) : (
              <>
                <strong className="has-text-danger">Planned</strong>
                {user && ` by ${user.name}`}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
