import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(store => store.currentTodo);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .catch((error) => {
          throw error;
        });
    }
  }, [currentTodo]);

  const handleCloseModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (<Loader />) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            <button
              aria-label="Modal Close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {user && (
                <>
                  {' by '}
                  <a href={`mailto:${user.email}`}>
                    {user.name}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
