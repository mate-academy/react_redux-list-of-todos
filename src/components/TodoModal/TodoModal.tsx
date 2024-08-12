import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentTodo) return;

      try {
        setIsLoadingUser(true);
        const fetchedUser = await getUser(currentTodo.userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, [currentTodo]);

  const handleClose = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close modal"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`} data-cy="user-email">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
