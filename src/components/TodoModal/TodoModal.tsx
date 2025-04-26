import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getUser } from '../../api';
import { User } from '../../types/User';
import {
  isOpened,
  setCurrentTodo,
  setLoadingUser,
} from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const { currentTodo, loadingUser } = useSelector(
    (state: RootState) => state.currentTodo,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    dispatch(setLoadingUser(true));
    getUser(currentTodo ? currentTodo.userId : 0)
      .then(setUser)
      .finally(() => dispatch(setLoadingUser(false)));
  }, [currentTodo]);

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
    dispatch(isOpened(false));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleCloseModal()}
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
