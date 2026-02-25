import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { setCurrentTodo } from '../../features/currentTodo';
import type { User } from '../../types/User';

export const TodoModal = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);
      setIsLoadingUser(false);

      return;
    }

    let isActive = true;

    setIsLoadingUser(true);
    setUser(null);

    getUser(currentTodo.userId)
      .then(loadedUser => {
        if (isActive) {
          setUser(loadedUser);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const close = () => dispatch(setCurrentTodo(null));

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={close} />

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
            aria-label="Close modal"
            onClick={close}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          {isLoadingUser ? (
            <Loader />
          ) : (
            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currentTodo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {currentTodo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'Unknown user'
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
