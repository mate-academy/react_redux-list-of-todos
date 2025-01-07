import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo, setIsLoadingTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo, isLoadingTodo } = useAppSelector(
    state => state.currentTodo,
  );
  const [user, setUser] = useState<User | null>(null);

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
  };

  useEffect(() => {
    if (currentTodo) {
      dispatch(setIsLoadingTodo(true));

      getUser(currentTodo.userId)
        .then(data => setUser(data))
        .finally(() => dispatch(setIsLoadingTodo(false)));
    }
  }, []);
  // setCurrentTodo({
  //   ...currentTodo,
  //   userName: user.name,
  //   userEmail: user.email,
  // }),

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingTodo ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
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
