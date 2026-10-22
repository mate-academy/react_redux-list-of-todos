import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { getUser } from '../../api';
import { setCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(null);

    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId)
      .then(setUser)
      .catch(() => setUser(null));
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const closeModal = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={closeModal} />

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
            aria-label="Close"
            onClick={closeModal}
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

            {user && (
              <>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
