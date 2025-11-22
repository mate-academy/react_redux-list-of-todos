import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { UseAppSelector } from '../../hooks';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import {
  setCurrentTodo,
  setCurrentUser,
  setLoading,
} from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { currentTodo, user, loading } = UseAppSelector(
    (state: RootState) => state.currentTodo,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    dispatch(setLoading(true));
    getUser(currentTodo.userId)
      .then((currentUser: User) => {
        dispatch(setCurrentUser(currentUser));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [currentTodo, dispatch]);

  const closeModal = () => {
    dispatch(setCurrentTodo(null));
    dispatch(setCurrentUser(null));
  };

  return (
    <div
      className={`modal ${currentTodo || loading ? 'is-active' : ''}`}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : currentTodo ? (
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
              onClick={closeModal}
              data-cy="modal-close"
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
              <a href={`${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
