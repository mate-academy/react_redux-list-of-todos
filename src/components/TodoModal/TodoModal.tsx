import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [userFromServer, setUserFromServer] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUserFromServer)
        .finally(() => setIsUserLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
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
              data-cy="modal-close"
              onClick={closeModal}
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

              <a href={`mailto:${userFromServer?.email}`}>
                {userFromServer?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
