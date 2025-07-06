import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentTodo, setCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(selectCurrentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    if (currentTodo) {
      setLoadingUser(true);
      setErrorUser(null);
      getUser(currentTodo.userId)
        .then(userData => {
          setUser(userData);
        })
        .catch(error => {
          setErrorUser(error.message);
        })
        .finally(() => {
          setLoadingUser(false);
        });
    } else {
      setUser(null);
    }
  }, [currentTodo]);

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
  };

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleCloseModal} />

      {loadingUser && <Loader />}

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
            onClick={handleCloseModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {loadingUser && !errorUser && 'Loading user...'}
            {errorUser && (
              <strong className="has-text-danger">{errorUser}</strong>
            )}
            {!loadingUser && !errorUser && user && (
              <>
                <strong
                  className={
                    currentTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {currentTodo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </>
            )}
            {!loadingUser && !errorUser && !user && (
              <strong className="has-text-grey">User not found</strong>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
