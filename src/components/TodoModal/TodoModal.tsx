import React, { memo, useCallback } from 'react';
import { Loader } from '../Loader';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { openTodo } from '../../features/todo/todoSlice';
import { fetchUser } from '../../features/user/userSlice';
import { closeModal } from '../../features/modal/modalSlice';

export const TodoModal: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => state.user);
  const { selectedTodo } = useAppSelector(state => state.todo);

  const handleClose = useCallback(() => {
    dispatch(openTodo(0));
    dispatch(fetchUser(0));
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {(!loading && user) && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
