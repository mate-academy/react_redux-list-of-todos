import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);

      return;
    }

    setLoading(true);
    setError(false);

    getUser(currentTodo.userId)
      .then(setUser)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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
        <header className="modal-card-head" data-cy="modal-header">
          <div className="modal-card-title has-text-weight-bold">
            {`Todo #${currentTodo.id}`}
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

          <p className="block">
            <strong className="has-text-weight-semibold">Planned: </strong>
            {currentTodo.completed ? (
              <span className="has-text-success">Done</span>
            ) : (
              <span className="has-text-danger">Planned</span>
            )}
          </p>

          {loading && <Loader />}

          {!loading && error && (
            <p className="has-text-danger">Something went wrong</p>
          )}

          {!loading && !error && user && (
            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? 'Done by ' : 'Planned by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
