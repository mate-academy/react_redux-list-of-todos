import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const { todo, user, modalLoading } = useAppSelector(
    state => state.currentTodo,
  );
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(currentTodoActions.toggleModal(false));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo && todo.id}
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
            {todo && todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {todo && todo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            <a href={user ? user.email : ''}>{user && user.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
