import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>();
  const [loading, SetLoading] = useState(false);
  const [error, SetError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (currentTodo) {
      setUser(null);
      SetLoading(true);
      SetError(null);

      const loadUser = async () => {
        try {
          const data = await getUser(currentTodo.userId);

          setUser(data);
        } catch (err) {
          SetError('There is no user with that id');
        } finally {
          SetLoading(false);
        }
      };

      loadUser();
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const handleClose = () => {
    dispatch(setCurrentTodo(null));
  };

  const isUserReady = !loading && user && user.id === currentTodo.userId;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />
      {!isUserReady && !error && <Loader />}
      {error && (
        <div className="notification is-danger">
          {error}
          <button className="delete" onClick={() => SetError(null)} />
        </div>
      )}

      {isUserReady && (
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

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currentTodo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {currentTodo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
