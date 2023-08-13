import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';

import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    getUser(currentTodo?.userId)
      .then((userFromServer) => {
        setUser(userFromServer);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  const handleClose = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              onClick={handleClose}
              data-cy="modal-close"
              aria-label="delete"
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

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
