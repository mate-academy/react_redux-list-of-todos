import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setIsLoadingUser(true);
    getUser(currentTodo.userId)
      .then(data => setUserData(data))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to load user', error);
      })
      .finally(() => setIsLoadingUser(false));
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
      {isLoadingUser && <Loader />}
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
            {currentTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            {isLoadingUser && <Loader />}
            {!isLoadingUser && userData && (
              <a href={`mailto:${userData.email}`}>{userData.name}</a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
