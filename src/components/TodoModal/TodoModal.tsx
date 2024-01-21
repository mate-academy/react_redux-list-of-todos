import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo, currentUser, userLoading } = useAppSelector(
    (state) => state.currentTodo,
  );
  const getCurrentUser = async () => {
    try {
      dispatch(currentTodoActions.setUserLoading(true));
      if (!currentTodo?.userId) {
        return;
      }

      const user = await getUser(currentTodo.userId);

      dispatch(currentTodoActions.setCurrentUser(user));
    } catch (error) {
      dispatch(currentTodoActions.setUserError(String(error)));
    } finally {
      dispatch(currentTodoActions.setUserLoading(false));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleCloseModal = () => {
    dispatch(currentTodoActions.showModal(false));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {currentTodo?.id}
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
              {/* For not completed */}
              {!currentTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {currentTodo?.completed && (
                <strong className="has-text-success">Done</strong>
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
