import React, { memo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import {
  clearSelection,
  selectCurrentTodo,
  selectCurrentUser,
  selectIsModalOpen,
} from '../../features/currentTodo';

export const TodoModal: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const todoData = useAppSelector(selectCurrentTodo);
  const userData = useAppSelector(selectCurrentUser);
  const isActive = useAppSelector(selectIsModalOpen);

  if (!isActive) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoData || !userData ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todoData.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(clearSelection());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoData.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': todoData.completed,
                  'has-text-danger': !todoData.completed,
                })}
              >
                {todoData.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${userData.email}`}>{userData.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

TodoModal.displayName = 'TodoModal';
