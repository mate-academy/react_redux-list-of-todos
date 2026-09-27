import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setLoading(true);
    getUser(currentTodo.userId)
      .then(setUser)
      .finally(() => {
        setLoading(false);
      });
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const handleClose = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={handleClose}
      />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            {`Todo #${currentTodo.id}`}
          </p>
          <button
            data-cy="modal-close"
            type="button"
            className="delete"
            aria-label="close"
            onClick={handleClose}
          />
        </header>

        <section className="modal-card-body">
          {loading && <Loader />}
          {!loading && (
            <>
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo.completed ? 'Done by ' : 'Planned by '}
                {user ? (
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                ) : (
                  '...'
                )}
              </p>
            </>
          )}
        </section>

        <footer className="modal-card-foot">
          <button
            data-cy="modal-close-button"
            type="button"
            className="button"
            onClick={handleClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
