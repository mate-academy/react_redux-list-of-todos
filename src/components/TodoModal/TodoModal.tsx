import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../api';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (currentTodo) {
        setLoadingUser(true);
        setUserError(null);
        try {
          const userData = await getUser(currentTodo.userId);

          setUser(userData);
        } catch (err) {
          setUserError('Failed to load user data.');
        } finally {
          setLoadingUser(false);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
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
            {currentTodo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}

            {userError && <span className="has-text-danger">{userError}</span>}

            {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
          </p>
        </div>
      </div>
    </div>
  );
};
