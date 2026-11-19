import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);

      return;
    }

    setLoading(true);
    setUser(null);

    getUser(currentTodo.userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
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
    <div
      className="modal is-active"
      data-cy="modal"
      style={{ display: 'flex' }}
    >
      <div className="modal-background" onClick={handleClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            {`Todo #${currentTodo.id}`}
          </p>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
          />
        </header>

        <section className="modal-card-body">
          {loading ? (
            <Loader />
          ) : (
            <>
              <p data-cy="modal-title">{currentTodo.title}</p>

              <p data-cy="modal-user">
                {currentTodo.completed
                  ? `Done by ${user?.name ?? ''}`
                  : `Planned by ${user?.name ?? ''}`}
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
