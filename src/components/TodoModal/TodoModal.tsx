import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { userId, id, title, completed } = currentTodo || {};

  useEffect(() => {
    const loadUser = async () => {
      if (userId) {
        const loadedUser = await getUser(userId);

        setUser(loadedUser);
        setLoaded(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleButtonClose = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(setCurrentTodo(null));
    },
    [dispatch],
  );

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleButtonClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
