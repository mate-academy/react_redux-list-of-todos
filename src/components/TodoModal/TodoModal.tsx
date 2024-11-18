import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/store';

export const TodoModal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoaderActive(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setCurrentUser)
        .finally(() => setIsLoaderActive(false));
    }
  }, [currentTodo?.userId]);

  const closeModalHandler = () => {
    dispatch(currentTodoSlice.actions.delete());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoaderActive ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {currentTodo?.id ? `Todo #${currentTodo.id}` : ''}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModalHandler}
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

              <a href={currentUser?.email}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
