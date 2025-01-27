import { Loader } from '../Loader';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearCurrentTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../hooks/useAppSelector';
import { User } from '../../types/User';
import { useEffect, useState } from 'react';
import { getUser } from '../../api';

export function TodoModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorUser, setIsErrorUser] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const dispatch = useAppDispatch();
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  function handleClose() {
    dispatch(clearCurrentTodo());
  }

  useEffect(() => {
    if (currentTodo) {
      setIsErrorUser(false);
      setIsLoading(true);

      getUser(currentTodo.userId)
        .then(currentUser => {
          setUser(currentUser);
        })
        .catch(() => {
          setIsErrorUser(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}
      {user && !isLoading && !isErrorUser && (
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
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {currentTodo?.completed ? (
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
}
