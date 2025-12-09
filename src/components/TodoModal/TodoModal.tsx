import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todo, user, isUserLoading } = useAppSelector(
    state => state.currentTodo,
  );

  if (!todo) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearCurrentTodo());
  };

  const statusText = todo.completed ? 'Done' : 'Planned';
  const statusClass = todo.completed ? 'has-text-success' : 'has-text-danger';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${todo.id}`}
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
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            <strong className={statusClass}>{statusText}</strong>
            {' by '}
            {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
          </p>
        </div>
      </div>
    </div>
  );
};
