import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import {
  currentUserFetching,
  currentUserFetchError,
  currentUserFetched,
} from '../../features/user';
import { getUser } from '../../api';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const { currentUser, currentUserLoadingStatus } = useAppSelector(
    state => state.currentUser,
  );
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    if (!currentTodo?.userId) {
      return;
    }

    try {
      dispatch(currentUserFetching());

      const data = await getUser(currentTodo?.userId);

      dispatch(currentUserFetched(data));
    } catch (error) {
      dispatch(currentUserFetchError());
      throw error;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [currentTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {currentUserLoadingStatus === 'loading' ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setCurrentTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
