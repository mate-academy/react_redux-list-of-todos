import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUser } from '../../hooks/useUser';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const { isLoading, errorMessage, user } = useUser(currentTodo?.userId);

  let content;

  if (!currentTodo) {
    return null;
  }

  if (isLoading) {
    content = <Loader />;
  }

  if (errorMessage) {
    content = <p>{errorMessage}</p>;
  }

  if (!isLoading && !errorMessage) {
    content = (
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
            onClick={() => dispatch(currentTodoSlice.actions.selectTodo(null))}
            type="button"
            className="delete"
            data-cy="modal-close"
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
            {user ? (
              <a href={`mailto:${user.email}`}>{user.name}</a>
            ) : (
              <p>User not found</p>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {content}
    </div>
  );
};
